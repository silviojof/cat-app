import { combineReducers } from 'redux';
import categories from './categories';
import cats from './cats';

export default combineReducers({ categories, cats });