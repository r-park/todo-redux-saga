import firebase from 'firebase/app';


export const authActions = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',
  SIGN_IN_FULFILLED: 'SIGN_IN_FULFILLED',

  SIGN_OUT: 'SIGN_OUT',
  SIGN_OUT_FAILED: 'SIGN_OUT_FAILED',
  SIGN_OUT_FULFILLED: 'SIGN_OUT_FULFILLED',


  signIn: authProvider => ({
    type: authActions.SIGN_IN,
    payload: {authProvider}
  }),

  signInFailed: error => ({
    type: authActions.SIGN_IN_FAILED,
    payload: {error}
  }),

  signInFulfilled: authUser => ({
    type: authActions.SIGN_IN_FULFILLED,
    payload: {authUser}
  }),

  signInWithGithub: () => authActions.signIn(
    new firebase.auth.GithubAuthProvider()
  ),

  signInWithGoogle: () => authActions.signIn(
    new firebase.auth.GoogleAuthProvider()
  ),

  signInWithTwitter: () => authActions.signIn(
    new firebase.auth.TwitterAuthProvider()
  ),

  signOut: () => ({
    type: authActions.SIGN_OUT
  }),

  signOutFailed: error => ({
    type: authActions.SIGN_OUT_FAILED,
    payload: {error}
  }),

  signOutFulfilled: () => ({
    type: authActions.SIGN_OUT_FULFILLED
  })
};
