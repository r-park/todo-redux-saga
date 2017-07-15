import { createSelector } from 'reselect';


export function getTasks(state) {
  return state.tasks;
}

export function getTaskFilter(state) {
  return getTasks(state).filter;
}

export function getTaskList(state) {
  return getTasks(state).list;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleTasks = createSelector(
  getTaskFilter,
  getTaskList,
  (filter, taskList) => {
    switch (filter) {
      case 'active':
        return taskList.filter(task => !task.completed);

      case 'completed':
        return taskList.filter(task => task.completed);

      default:
        return taskList;
    }
  }
);
