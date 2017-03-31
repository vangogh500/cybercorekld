import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import NavbarSync from './containers/navbarsync.js'
import AuthPage from './authPage.js'
import LadderPage from './ladderPage.js'
import AuthSection from './authSection.js'

import { loginFromStorage } from './actions/authorization.js'

import authApp from './reducers/authorization.js'

let store = createStore(authApp, applyMiddleware(thunkMiddleware))
store.dispatch(loginFromStorage())

ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={NavbarSync}>
          <Route path="/auth" component={AuthSection}>
            <IndexRoute component={AuthPage} />
          </Route>
          <Route path="/auth/ladder" component={LadderPage} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('app')
);
