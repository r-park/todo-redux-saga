import { all } from 'redux-saga/effects'
import { authSagas } from './auth';
import { taskSagas } from './tasks';


export default function* sagas() {
  yield all([
    ...authSagas,
    ...taskSagas
  ]);
}
