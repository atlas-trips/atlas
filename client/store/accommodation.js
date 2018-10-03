import axios from 'axios'
//import history from '../history';

const GET_ACCOMMODATIONS = 'GET_ACCOMMODATIONS'

const initialAccom = {}

const getAccommodations = accommodations => ({
  type: GET_ACCOMMODATIONS,
  accommodations
})

export const fetchAccommodations = () => async dispatch => {
  try {
    const res = await axios.get('/api/accommodations')
    dispatch(getAccommodations(res.data))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = initialAccom, action) {
  switch (action.type) {
    case GET_ACCOMMODATIONS:
      return action.accommodations
    default:
      return state
  }
}
