import { authSagas } from './auth';
import { taskSagas } from './tasks';


export default function* sagas() {
  yield [
    ...authSagas,
    ...taskSagas
  ];
}
