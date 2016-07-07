export const taskActions = {
  CREATE_TASK: 'CREATE_TASK',
  CREATE_TASK_FAILED: 'CREATE_TASK_FAILED',
  CREATE_TASK_FULFILLED: 'CREATE_TASK_FULFILLED',

  REMOVE_TASK: 'REMOVE_TASK',
  REMOVE_TASK_FAILED: 'REMOVE_TASK_FAILED',
  REMOVE_TASK_FULFILLED: 'REMOVE_TASK_FULFILLED',

  UPDATE_TASK: 'UPDATE_TASK',
  UPDATE_TASK_FAILED: 'UPDATE_TASK_FAILED',
  UPDATE_TASK_FULFILLED: 'UPDATE_TASK_FULFILLED',

  FILTER_TASKS: 'FILTER_TASKS',
  LOAD_TASKS_FULFILLED: 'LOAD_TASKS_FULFILLED',


  createTask: title => ({
    type: taskActions.CREATE_TASK,
    payload: {task: {title, completed: false}}
  }),

  createTaskFailed: error => ({
    type: taskActions.CREATE_TASK_FAILED,
    payload: {error}
  }),

  createTaskFulfilled: task => ({
    type: taskActions.CREATE_TASK_FULFILLED,
    payload: {task}
  }),

  removeTask: task => ({
    type: taskActions.REMOVE_TASK,
    payload: {task}
  }),

  removeTaskFailed: error => ({
    type: taskActions.REMOVE_TASK_FAILED,
    payload: {error}
  }),

  removeTaskFulfilled: task => ({
    type: taskActions.REMOVE_TASK_FULFILLED,
    payload: {task}
  }),

  updateTask: (task, changes) => ({
    type: taskActions.UPDATE_TASK,
    payload: {task, changes}
  }),

  updateTaskFailed: error => ({
    type: taskActions.UPDATE_TASK_FAILED,
    payload: {error}
  }),

  updateTaskFulfilled: task => ({
    type: taskActions.UPDATE_TASK_FULFILLED,
    payload: {task}
  }),

  filterTasks: filterType => ({
    type: taskActions.FILTER_TASKS,
    payload: {filterType}
  }),

  loadTasksFulfilled: tasks => ({
    type: taskActions.LOAD_TASKS_FULFILLED,
    payload: {tasks}
  })
};
