import axios from 'axios';
import history from '../history';

const GET_ACCOMODATIONS = 'GET_ACCOMODATIONS';

const accomodations = {};


const getAccomodations = accomodation =>  ({type: GET_ACCOMODATIONS, accomodation})