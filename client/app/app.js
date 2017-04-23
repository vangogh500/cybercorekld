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
            <Route path="/auth/onevone" component={LadderAppSync}>
              <Route component={LadderSection}>
                <Route path="/auth/onevone/matches" component={MatchesPageSync} />
                <Route path="/auth/onevone/ladder" component={LadderPage} />
              </Route>
              <Route path="/auth/onevone/user/:userId" component={UserPageSync} />
            </Route>
            <Route component={TournamentsAppSync}>
              <Route path="/auth/tournaments" component={TournamentPage} />
              <Route path="/auth/tournaments/teams" component={TeamsPageSync} />
              <Route path="/auth/tournament/:teamId" component={TournamentListingSectionSync}>
                <IndexRoute component={TournamentListingTeams} />
                <Route path="/auth/tournament/:teamId/bracket" component={TournamentListingBracket} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('app')
);
