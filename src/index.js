import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// Import sass file from bushido-strap for global style overhaul
import "bushido-strap/css/main.css";

// Keep this puppy here for later!
import * as serviceWorker from "./serviceWorker";

// Import Firebase config
import firebase from "./config/firebase";

/* 
We're going to need to pass our local GQL client to out ApolloProvider so we have access to our database throughout our app 
*/
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Set up Redux/Router
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import logger from "redux-logger";
import thunk from "redux-thunk";

// Import reducer/index.js as root reducer, it's where we're combining all our reducer files
import rootReducer from "./store/reducers";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const reactReduxFirebaseConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true
};

const reactReduxFirebaseProps = {
  firebase,
  config: reactReduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

// We need to point our ApolloClient to the right database
// In this instance, it's our localhost port 4000
const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

// wrap app with router and redux provider
ReactDOM.render(
  // our redux provider wraps our firebase's react-redux provide which wraps our Router and then App
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
        <Router>
          <App />
        </Router>
      </ReactReduxFirebaseProvider>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
