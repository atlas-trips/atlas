import axios from 'axios';

const GET_TRIPS = 'GET_TRIPS';
const GET_SELECTED_TRIP = 'GET_SELECTED_TRIP';

const defaultTrip = {
  all: [],
  selected: {}
};

const getTrips = trips => ({ type: GET_TRIPS, trips });
const getSelected = trip => ({ type: GET_SELECTED_TRIP, trip });

export const fetchTrips = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}/trips`);
    dispatch(getTrips(res.data));
    //sets first trip as selected for now, will update
    dispatch(getSelected(res.data[0]));
  } catch (err) {
    console.log(err);
  }
};

export default function(state = defaultTrip, action) {
  switch (action.type) {
    case GET_TRIPS:
      return { ...state, all: action.trips };
    case GET_SELECTED_TRIP:
      return { ...state, selected: action.trip };
    default:
      return state;
  }
}
