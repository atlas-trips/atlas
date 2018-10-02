import axios from 'axios'

const GET_ACTIVITIES = 'GET_ACTIVITIES'
const SEND_ACTIVITIES = 'SEND_ACTIVITIES'

const defaultActivity = {
  all: []
}

const getActivities = activities => ({
  type: GET_ACTIVITIES,
  activities
})

const sendActivity = activities => ({
  type: SEND_ACTIVITIES,
  activities
})

export const fetchActivities = () => async dispatch => {
  try {
    const res = await axios.get('/api/activities')
    dispatch(getActivities(res.data))
  } catch (err) {
    console.log(err)
  }
}

export const sendActivityInfo = activityInfo => async dispatch => {
  try {
    const {data} = await axios.post('/api/activities/add', activityInfo)
    dispatch(sendActivity(data))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = defaultActivity, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {...state, all: action.activities}
    case SEND_ACTIVITIES:
      return action.activities
    default:
      return state
  }
}
