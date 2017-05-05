import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { AUTH_URL, AUTH_HOME_URL, AUTH_LOGIN_URL, USERS_HOME_URL } from './res/strings.js'

import NavbarSync from './res/containers/navbarsync.js'
import AuthLoginPage from './authorization/components/authLoginPage.js'
import AuthHomePage from './authorization/components/AuthHomePage.js'
import LadderSection from './components/ladderSection.js'
import LadderPage from './ladderPage.js'
import MatchesPageSync from './containers/matchesPageSync.js'
import UserPageSync from './containers/userPageSync.js'
import LadderAppSync from './containers/ladderAppSync.js'
import TournamentsAppSync from './containers/tournamentApp/tournamentsAppSync.js'
import TournamentPage from './tournamentPage.js'
import TeamsPageSync from './containers/tournamentApp/teamsPageSync.js'
import TournamentListingSectionSync from './containers/tournamentApp/tournamentListingSectionSync.js'
import TournamentListingTeams from './components/tournamentApp/tournamentListingTeams.js'
import TournamentListingBracket from './components/tournamentApp/tournamentListingBracket.js'

import UsersApp from './users/containers/usersAppSync.js'
import UsersHomePage from './users/components/UsersHomePage.js'

import { loginFromStorage } from './authorization/actions.js'

import app from './reducers/app.js'

let store = createStore(app, applyMiddleware(thunkMiddleware))
store.dispatch(loginFromStorage())

ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={NavbarSync}>
          <Route path={AUTH_LOGIN_URL} component={AuthLoginPage} />
          <Route path={AUTH_HOME_URL} component={AuthHomePage} />
          <Route component={TournamentsAppSync}>
            <Route path="/auth/tournaments" component={TournamentPage} />
            <Route path="/auth/tournaments/teams" component={TeamsPageSync} />
            <Route path="/auth/tournament/:teamId" component={TournamentListingSectionSync}>
              <IndexRoute component={TournamentListingTeams} />
              <Route path="/auth/tournament/:teamId/bracket" component={TournamentListingBracket} />
            </Route>
          </Route>
          <Route component={UsersApp}>
            <Route path={AUTH_URL + USERS_HOME_URL} component={UsersHomePage} />
          </Route>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('app')
);
