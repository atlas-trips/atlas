const GET_COORDINATES = 'GET_COORDINATES';

const defaultCoordinates = {
  coordinates: '',
  place: {}
};

const getCoordinates = coordinates => ({
  type: GET_COORDINATES,
  coordinates
});

export const fetchCoordinates = coordinates => dispatch => {
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
