import { FirebaseList } from 'src/core/firebase';
import { taskActions } from './actions';
import { Task } from './task';



export const taskList = new FirebaseList({
  onAdd: taskActions.createTaskFulfilled,
  onChange: taskActions.updateTaskFulfilled,
  onLoad: taskActions.loadTasksFulfilled,
  onRemove: taskActions.removeTaskFulfilled
}, Task);
