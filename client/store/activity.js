import axios from 'axios'

const GET_ACTIVITY = 'GET_ACTIVITY'

const initialActivites = {}

const getActivity = itinerary => ({
  type: GET_ITINERARY,
  itinerary
})

export const fetchActivities = () => async dispatch => {
  try {
    const res = await axios.get('/api/accommodations')
    dispatch(getAccommodations(res.data))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = initialItinerary, action) {
  switch (action.type) {
    case GET_ACCOMMODATIONS:
      return action.accommodations
    default:
      return state
  }
}
