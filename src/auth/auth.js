import { firebaseAuth } from 'src/firebase';
import { authActions } from './actions';


export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          dispatch(authActions.signInFulfilled(authUser));
        }

        resolve();
        unsubscribe();
      },

      error => reject(error)
    );
  });
}
