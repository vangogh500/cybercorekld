import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import NavbarSync from './containers/navbarsync.js'
import AuthPage from './authPage.js'
import AuthHomePage from './AuthHomePage.js'
import AuthSectionSync from './containers/authSectionSync.js'
import LadderSectionSync from './containers/ladderSectionSync.js'
import LadderPage from './ladderPage.js'
import MatchesPage from './matchesPage.js'

import { loginFromStorage } from './actions/authorization.js'

import app from './reducers/app.js'

let store = createStore(app, applyMiddleware(thunkMiddleware))
store.dispatch(loginFromStorage())

ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={NavbarSync}>
          <Route path="/auth" component={AuthSectionSync}>
            <IndexRoute component={AuthPage} />
            <Route path="/auth/home" component={AuthHomePage} />
            <Route path="/auth/onevone" component={LadderSectionSync}>
              <Route path="/auth/onevone/ladder" component={LadderPage} />
              <Route path="/auth/onevone/matches" component={MatchesPage} />
            </Route>
          </Route>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('app')
);
