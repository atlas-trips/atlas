import axios from 'axios';

const GET_TRANSPORTATION = 'GET_TRANSPORTATION';

const getTransportation = transportation => ({
  type: GET_TRANSPORTATION,
  transportation
});

export const fetchTransportation = tripId => async dispatch => {
  try {
    const res = await axios.get('/api/tranportation');
    const transportation = res.data.filter(
      transport => transport.tripId === tripId
    );
    dispatch(getTransportation(transportation));
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
