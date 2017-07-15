import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './auth';
import { tasksReducer } from './tasks';


export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  tasks: tasksReducer
});
