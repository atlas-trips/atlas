/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar';
export {Login, Signup} from './AuthForm';
export {default as Dashboard} from './Dashboard';
export {default as Accommodations} from './Accommodations';
export {default as Calendar} from './Calendar';
export {default as Expenses} from './Expenses';
export {default as Activities} from './Activities';
export {default as Travel} from './Travel';
export {default as Landing} from './Landing';
export {default as AllTrips} from './AllTrips';
export {default as SingleTrip} from './SingleTrip';
export {default as TripForm} from './TripForm';
export {default as AccommodationForm} from './AccommodationForm';
export {default as ShareTrip} from './ShareTrip';
