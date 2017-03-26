import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router'

import Navbar from './components/navbar.js'
import AuthPage from './authPage.js'
import LadderPage from './ladderPage.js'


ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Navbar}>
        <Route path="/auth" component={AuthPage} />
        <Route path="/auth/ladder" component={LadderPage} />
      </Route>
    </Router>
  ),
  document.getElementById('app')
);
