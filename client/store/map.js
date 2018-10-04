import axios from 'axios';

const GET_COORDINATES = 'GET_COORDINATES';

const defaultCoordinates = {};

const getCoordinates = coordinates => ({
  type: GET_COORDINATES,
  coordinates
});

export const fetchCoordinates = coordinates => dispatch => {
  console.log('being RUN');
  dispatch(getCoordinates(coordinates));
};

export default function(state = defaultCoordinates, action) {
  switch (action.type) {
    case GET_COORDINATES:
      return action.coordinates;
    default:
      return state;
  }
}
