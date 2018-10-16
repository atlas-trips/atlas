import axios from 'axios';
import socket from '../socket';

const GET_TRIPS = 'GET_TRIPS';
const GET_SELECTED_TRIP = 'GET_SELECTED_TRIP';
const SET_NEW_TRIP = 'SET_NEW_TRIP';
const GET_ACTIVITIES = 'GET_ACTIVITIES';
const SET_ACTIVITY = 'SET_ACTIVITY';
const SET_ACTIVITY_SOCKET = 'SET_ACTIVITY_SOCKET';
const SET_TRIP_CALENDAR = 'SET_TRIP_CALENDAR';
const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';
const REMOVE_TRIP = 'REMOVE_TRIP';
const SHARE_TRIP = 'SHARE_TRIP';
const GET_REF_TRIP = 'GET_REF_TRIP';

const defaultTrip = {
  all: [],
  selected: {},
  activities: [],
  tripCalendar: []
};

const getTrips = trips => ({type: GET_TRIPS, trips});
export const getSelected = trip => ({type: GET_SELECTED_TRIP, trip});
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

const setActivitySocket = activity => ({
  type: SET_ACTIVITY_SOCKET,
  activity
});

const setTripCalendar = calendar => ({
  type: SET_TRIP_CALENDAR,
  calendar
});

const removeActivity = id => ({
  type: REMOVE_ACTIVITY,
  id
});

const removeTrip = id => ({
  type: REMOVE_TRIP,
  id
});

const shareTripLink = message => ({
  type: SHARE_TRIP,
  message
});

export const fetchTrips = id => async dispatch => {
  try {
    const {data: trips} = await axios.get(`/api/users/${id}/trips`);
    dispatch(getTrips(trips));
  } catch (err) {
    console.log(err);
  }
};
export const updateAct = act => dispatch => {
  dispatch(setActivitySocket(act));
};

export const fetchSelected = tripId => async dispatch => {
  try {
    const {data: trip} = await axios.get(`/api/trips/${tripId}`);
    dispatch(getSelected(trip));
  } catch (err) {
    console.log(err);
  }
};

export const fetchRefTrip = tripLink => async dispatch => {
  try {
    const {data: trip} = await axios.get(`/api/trips/join/${tripLink}`);
    dispatch(getRefTrip(trip));
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
    const {data: activities} = await axios.get(`/api/trips/${id}/activities`);
    dispatch(getActivities(activities));
  } catch (err) {
    console.log(err);
  }
};

export const sendSocket = newAct => dispatch => {
  dispatch(setActivitySocket(newAct));
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

export const deleteActivity = (tripId, actId) => async dispatch => {
  try {
    await axios.delete(`/api/trips/${tripId}/activities/${actId}`);
    dispatch(removeActivity(actId));
  } catch (err) {
    console.log(err);
  }
};

export const deleteTrip = tripId => async dispatch => {
  try {
    await axios.delete(`/api/trips/${tripId}`);
    dispatch(removeTrip(tripId));
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

export const shareTrip = tripInfo => async dispatch => {
  try {
    const {data: sharedTrip} = await axios.post(`/api/trips/share`, tripInfo);
    dispatch(shareTripLink(sharedTrip));
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
      const newState = {
        ...state,
        activities: [...state.activities, action.activity]
      };
      socket.emit('tripUpdate', action.activity);
      return newState;
    case SET_ACTIVITY_SOCKET:
      return {...state, activities: [...state.activities, action.activity]};
    case REMOVE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(act => act.id !== action.id)
      };
    case REMOVE_TRIP:
      return {
        ...state,
        all: state.all.filter(trip => trip.id !== action.id)
      };
    case SET_TRIP_CALENDAR:
      return {...state, tripCalendar: [...action.calendar]};
    default:
      return state;
  }
}
