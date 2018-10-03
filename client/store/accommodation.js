import axios from 'axios';

const SET_ACCOMMODATIONS = 'SET_ACCOMMODATIONS';
const SET_NEW_ACCOMMODATION = 'SET_NEW_ACCOMMODATION';

const initialState = {
  selected: {},
  accommodations: [],
};

const setAccommodations = accommodations =>  ({type: SET_ACCOMMODATIONS, accommodations});
const setNewAccommodation = accomodation => ({
  type: SET_NEW_ACCOMMODATION,
  accomodation,
})

export const getAccommodations = tripId => async dispatch => {
    try {
        const res = await axios.get(`/api/trips/${tripId}/accommodations`)
        dispatch(setAccommodations(res.data))
    } catch (err){
        console.log(err);
    }
}

export const getNewAccommodation = accommo => async dispatch => {
  try {
    const { data:accommodation } = await axios.post('/api/accommodations', accommo);
    dispatch(setNewAccommodation(accommodation));
  } catch (error) {
    console.log(error);
  }
}

export default function (state = initialState, action){
    switch(action.type){
        case SET_ACCOMMODATIONS:
            return {...state, accommodations: action.accommodations };
        case SET_NEW_ACCOMMODATION:
          return {...state, accommodations: [...state.accommodations, action.accommodation]}
        default:
            return state;
    }
}
