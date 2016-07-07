/* eslint-disable no-constant-condition */
import { LOCATION_CHANGE } from 'react-router-redux';
import { eventChannel } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { authActions } from 'src/core/auth';
import { taskActions } from './actions';
import { taskList } from './task-list';


function subscribe() {
  return eventChannel(emit => taskList.subscribe(emit));
}

function* read() {
  const channel = yield call(subscribe);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(context, method, onError, ...params) {
  try {
    yield call([context, method], ...params);
  }
  catch (error) {
    yield put(onError(error));
  }
}

const createTask = write.bind(null, taskList, taskList.push, taskActions.createTaskFailed);
const removeTask = write.bind(null, taskList, taskList.remove, taskActions.removeTaskFailed);
const updateTask = write.bind(null, taskList, taskList.update, taskActions.updateTaskFailed);


//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);

    taskList.path = `tasks/${payload.authUser.uid}`;
    const job = yield fork(read);

    yield take([authActions.SIGN_OUT_FULFILLED]);
    yield cancel(job);
  }
}

function* watchCreateTask() {
  while (true) {
    let { payload } = yield take(taskActions.CREATE_TASK);
    yield fork(createTask, payload.task);
  }
}

function* watchLocationChange() {
  while (true) {
    let { payload } = yield take(LOCATION_CHANGE);
    if (payload.pathname === '/') {
      yield put(taskActions.filterTasks(payload.query.filter));
    }
  }
}

function* watchRemoveTask() {
  while (true) {
    let { payload } = yield take(taskActions.REMOVE_TASK);
    yield fork(removeTask, payload.task.key);
  }
}

function* watchUpdateTask() {
  while (true) {
    let { payload } = yield take(taskActions.UPDATE_TASK);
    yield fork(updateTask, payload.task.key, payload.changes);
  }
}


//=====================================
//  TASK SAGAS
//-------------------------------------

export const taskSagas = [
  fork(watchAuthentication),
  fork(watchCreateTask),
  fork(watchLocationChange),
  fork(watchRemoveTask),
  fork(watchUpdateTask)
];
