import axios from 'axios';

const GET_TRANSPORTATION = 'GET_TRANSPORTATION';
const UPDATE_TRANSPORTATION = 'UPDATE_TRANSPORTATION';

const getTransportation = transportation => ({
  type: GET_TRANSPORTATION,
  transportation
});

const updateTransportation = transportation => ({
  type: UPDATE_TRANSPORTATION,
  transportation
});

export const fetchTransportation = tripId => async dispatch => {
  try {
    const res = await axios.get(`/api/transportation/${tripId}`);
    dispatch(getTransportation(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const putTransportation = (tripId, userId) => async dispatch => {
  try {
    const res = await axios.put(`/api/transportation/${tripId}/${userId}`);
    dispatch(updateTransportation(res.data));
  } catch (err) {
    console.log(err);
  }
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_TRANSPORTATION:
      return action.transportation;
    case UPDATE_TRANSPORTATION:
      let newState = state.filter(
        transportation => transportation.id !== action.transportation.id
      );
      return [...newState, action.transportation];
    default:
      return state;
  }
}
