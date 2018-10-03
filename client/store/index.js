import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import accommodation from './accommodation';
import trip from './trip';
import activity from './activity';
import transportation from './transportation';

const reducer = combineReducers({
  user,
  accommodation,
  trip,
  activity,
  transportation
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './accommodation';
export * from './trip';
export * from './activity';
