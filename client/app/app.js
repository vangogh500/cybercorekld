import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { AUTH_URL, AUTH_HOME_URL, AUTH_LOGIN_URL, USERS_HOME_URL } from './res/strings.js'

import AuthApp from './authorization/containers/authAppSync.js'

import NavbarSync from './res/containers/navbarsync.js'
import AuthLoginPage from './authorization/components/authLoginPage.js'
import AuthHomePage from './authorization/components/AuthHomePage.js'
import LadderSection from './components/ladderSection.js'
import LadderPage from './ladderPage.js'
import MatchesPageSync from './containers/matchesPageSync.js'
import UserPageSync from './containers/userPageSync.js'
import LadderAppSync from './containers/ladderAppSync.js'
import TournamentsApp from './tournaments/containers/tournamentsAppSync.js'
import TournamentsHomePage from './tournaments/components/tournamentsHomePage.js'
import TournamentPage from './tournamentPage.js'
import TeamsPageSync from './containers/tournamentApp/teamsPageSync.js'

import TournamentListingApp from './tournaments/containers/subscribedTournamentListingAppSync.js'

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
          <Route component={AuthApp}>
            <Route path={AUTH_HOME_URL} component={AuthHomePage} />
            <Route component={TournamentsApp}>
              <Route path="/auth/tournaments" component={TournamentsHomePage} />
              <Route path="/auth/tournaments/teams" component={TeamsPageSync} />
              <Route path="/auth/tournament/:tournamentId" component={TournamentListingApp}>
                <IndexRoute center={<div></div>} right={<div></div>} />
              </Route>
            </Route>
            <Route component={UsersApp}>
              <Route path={AUTH_URL + USERS_HOME_URL} component={UsersHomePage} />
            </Route>
          </Route>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('app')
);
