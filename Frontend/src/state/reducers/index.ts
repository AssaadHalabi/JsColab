import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundlesReducer from './bundlesReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
  user: userReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
