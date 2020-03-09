import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../reducer';

const middleWare = [thunk];
const initialState = {};

export default createStore(
  appReducer,
  initialState,
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
