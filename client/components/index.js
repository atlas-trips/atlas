/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {Login, Signup} from './AuthForm';
export {default as Dashboard} from './Dashboard';
export {default as Accommodations} from './AccommodationComponents/Accommodations';
export {default as Calendar} from './CalendarComponents/Calendar';
export {default as Activities} from './ActivityComponents/Activities';
export {default as Travel} from './TravelComponents/Travel';
export {default as Landing} from './Landing';
export {default as AllTrips} from './AllTrips';
export {default as SingleTrip} from './SingleTrip';
export {default as TripForm} from './TripForm';
export {default as AccommodationForm} from './AccommodationComponents/AccommodationForm';
export {default as ShareTrip} from './ShareTrip';
export {default as TravelForm} from './TravelComponents/TravelForm';
export {default as SingleTransport} from './TravelComponents/SingleTransport';
export {default as Header} from './Header';
