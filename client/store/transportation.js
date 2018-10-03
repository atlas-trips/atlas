import axios from 'axios';

const GET_TRANSPORTATION = 'GET_TRANSPORTATION';

const getTransportation = transportation => ({
  type: GET_TRANSPORTATION,
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

export default function(state = [], action) {
  switch (action.type) {
    case GET_TRANSPORTATION:
      return action.transportation;
    default:
      return state;
  }
}
