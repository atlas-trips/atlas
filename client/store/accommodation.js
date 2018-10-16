import axios from 'axios';

const SET_ACCOMMODATIONS = 'SET_ACCOMMODATIONS';
const SET_NEW_ACCOMMODATION = 'SET_NEW_ACCOMMODATION';
const DELETE_ACCOMMODATION = 'DELETE_ACCOMMODATION';

const initialState = {
  selected: {},
  accommodations: []
};

const setAccommodations = accommodations => ({
  type: SET_ACCOMMODATIONS,
  accommodations
});
const setNewAccommodation = accommodation => ({
  type: SET_NEW_ACCOMMODATION,
  accommodation
});

const removeAccommodation = id => ({
  type: DELETE_ACCOMMODATION,
  id
});

export const getAccommodations = tripId => async dispatch => {
  try {
    const {data: accommodations} = await axios.get(
      `/api/trips/${tripId}/accommodations`
    );
    dispatch(setAccommodations(accommodations));
  } catch (err) {
    console.log(err);
  }
};

export const getNewAccommodation = accommodation => async dispatch => {
  try {
    const {data: accommodation} = await axios.post(
      '/api/accommodations',
      accommodation
    );
    dispatch(setNewAccommodation(accommodation));
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccommodation = accomId => async dispatch => {
  try {
    await axios.delete('api/accommodations', {data: {id: accomId}});
    dispatch(removeAccommodation(accomId));
  } catch (error) {
    console.log(error);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOMMODATIONS:
      return {...state, accommodations: action.accommodations};
    case SET_NEW_ACCOMMODATION:
      return {
        ...state,
        accommodations: [...state.accommodations, action.accommodation]
      };
    case DELETE_ACCOMMODATION:
      return {
        ...state,
        accommodations: [
          ...state.accommodations.filter(accom => accom.id !== action.id)
        ]
      };
    default:
      return state;
  }
}
