[![CircleCI](https://circleci.com/gh/r-park/todo-redux-saga.svg?style=shield&circle-token=dc7e150ab97aab05db8f8da4b5874488bf8da0c6)](https://circleci.com/gh/r-park/todo-redux-saga)


# A simple Todo app example built with Create-React-App, Redux, Redux-Saga, and Firebase

Try the demo at <a href="https://todo-redux-saga.firebaseapp.com" target="_blank">todo-redux-saga.firebaseapp.com</a>.


## Stack

- Create-React-App
- React
- React-Redux
- React-Router
- React-Router-Redux
- Redux
- Redux-Saga
- Redux-Devtools-Extension for Chrome
- Firebase SDK with OAuth authentication
- Immutable
- Reselect
- SASS


## Quick Start

```shell
$ git clone https://github.com/r-park/todo-redux-saga.git
$ cd todo-redux-saga
$ npm install
$ npm start
```

## Deploying to Firebase
#### Prerequisites:
- Create a free Firebase account at https://firebase.google.com
- Create a project from your [Firebase account console](https://console.firebase.google.com)
- Configure the authentication providers for your Firebase project from your Firebase account console

#### Configure this app with your project-specific details:
```json
// .firebaserc

{
  "projects": {
    "default": "your-project-id"
  }
}
```

```javascript
// src/firebase/config.js

export const firebaseConfig = {
  apiKey: 'your api key',
  authDomain: 'your-project-id.firebaseapp.com',
  databaseURL: 'https://your-project-id.firebaseio.com',
  storageBucket: 'your-project-id.appspot.com'
};
```

#### Install firebase-tools:
```shell
$ npm install -g firebase-tools
```

#### Build and deploy the app:
```shell
$ npm run build
$ firebase login
$ firebase use default
$ firebase deploy
```


## NPM Commands

|Script|Description|
|---|---|
|`npm start`|Start webpack development server @ `localhost:3000`|
|`npm run build`|Build the application to `./build` directory|
|`npm test`|Test the application; watch for changes and retest|
