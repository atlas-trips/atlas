import axios from 'axios'

const GET_TRIPS = 'GET_TRIPS';
const GET_SELECTED_TRIP = 'GET_SELECTED_TRIP';
const SET_NEW_TRIP = 'SET_NEW_TRIP'

const defaultTrip = {
  all: [],
  selected: {}
}

const getTrips = trips => ({type: GET_TRIPS, trips});
const getSelected = trip => ({type: GET_SELECTED_TRIP, trip});
const setNewTrip = trip => ({type: SET_NEW_TRIP, trip});

export const fetchTrips = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}/trips`)
    dispatch(getTrips(res.data))
  } catch (err) {
    console.log(err)
  }
}

export const fetchSelected = tripId => async dispatch => {
  try {
    const trip = await axios.get(`/api/trips/${tripId}`)
    dispatch(getSelected(trip.data))
  } catch (err) {
    console.log(err)
  }
}

export const makeTrip = trip => async dispatch => {
  try {
    const { data:newTrip } = await axios.post('/api/trips', trip)
    dispatch(setNewTrip(newTrip));
  } catch (error) {
    console.log(error);
  }
}

export default function (state = defaultTrip, action){
    switch(action.type){
        case GET_TRIPS:
            return {...state, all: action.trips}
        case GET_SELECTED_TRIP:
            return {...state, selected: action.trip}
        case SET_NEW_TRIP:
          return {...state, all: [...state.all, action.trip]}
        default:
            return state;
    }
}
