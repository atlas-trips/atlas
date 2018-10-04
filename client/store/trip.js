import axios from 'axios';

const GET_TRIPS = 'GET_TRIPS';
const GET_SELECTED_TRIP = 'GET_SELECTED_TRIP';
const SET_NEW_TRIP = 'SET_NEW_TRIP';
const GET_ACTIVITIES = 'GET_ACTIVITIES';
const SET_ACTIVITY = 'SET_ACTIVITY';
const SET_TRIP_CALENDAR = 'SET_TRIP_CALENDAR';
const GET_REF_TRIP = 'GET_REF_TRIP';

const defaultTrip = {
  all: [],
  selected: {},
  activities: [],
  tripCalendar: []
};

const getTrips = trips => ({type: GET_TRIPS, trips});
const getSelected = trip => ({type: GET_SELECTED_TRIP, trip});
const getRefTrip = trip => ({type: GET_REF_TRIP, trip});
const setNewTrip = trip => ({type: SET_NEW_TRIP, trip});
const getActivities = activities => ({
  type: GET_ACTIVITIES,
  activities
});

const setActivity = activity => ({
  type: SET_ACTIVITY,
  activity
});

const setTripCalendar = calendar => ({
  type: SET_TRIP_CALENDAR,
  calendar
});

export const fetchTrips = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}/trips`);
    dispatch(getTrips(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const fetchSelected = tripId => async dispatch => {
  try {
    const trip = await axios.get(`/api/trips/${tripId}`);
    dispatch(getSelected(trip.data));
  } catch (err) {
    console.log(err);
  }
};

export const fetchRefTrip = tripLink => async dispatch => {
  try {
    const trip = await axios.get(`/api/trips/join/${tripLink}`);
    dispatch(getRefTrip(trip.data));
  } catch (err) {
    console.log(err);
  }
};

export const makeTrip = trip => async dispatch => {
  try {
    const {data: newTrip} = await axios.post('/api/trips', trip);
    dispatch(setNewTrip(newTrip));
  } catch (error) {
    console.log(error);
  }
};

export const fetchActivities = id => async dispatch => {
  try {
    const res = await axios.get(`/api/trips/${id}/activities`);
    dispatch(getActivities(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const sendActivityInfo = (activityInfo, tripId) => async dispatch => {
  try {
    const {data: newAct} = await axios.post(
      `/api/trips/${tripId}/activities`,
      activityInfo
    );
    dispatch(setActivity(newAct));
  } catch (err) {
    console.log(err);
  }
};

export const getTripCalendar = tripId => async dispatch => {
  try {
    const {data: calendar} = await axios.get(`/api/trips/${tripId}/all`);
    dispatch(setTripCalendar(calendar));
  } catch (error) {
    console.log(error);
  }
};

export default function(state = defaultTrip, action) {
  switch (action.type) {
    case GET_TRIPS:
      return {...state, all: action.trips};
    case GET_SELECTED_TRIP:
      return {...state, selected: action.trip};
    case GET_REF_TRIP:
      return {...state, selected: action.trip};
    case SET_NEW_TRIP:
      return {...state, all: [...state.all, action.trip]};
    case GET_ACTIVITIES:
      return {...state, activities: action.activities};
    case SET_ACTIVITY:
      return {...state, activities: [...state.activities, action.activity]};
    case SET_TRIP_CALENDAR:
      return {...state, tripCalendar: [...action.calendar]};
    default:
      return state;
  }
}
