import { combineReducers } from 'redux';

import matrix from './matrix';
import checkInfo from './checkInfo'

export default combineReducers({
  matrix,
  checkInfo,
});
