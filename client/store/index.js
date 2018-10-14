import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import accommodation from './accommodation';
import trip from './trip';
import map from './map';

const reducer = combineReducers({
  user,
  accommodation,
  trip,
  map
});

function combined(state = {}, action){
  return {
    user: user(state.user, action),
    accommodation: accommodation(state.accommodation, action),
    trip: trip(state.trip, action),
    map: map(state.map, action)
  }
}
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(combined, middleware);

export default store;
export * from './user';
export * from './accommodation';
export * from './trip';
export * from './map';
