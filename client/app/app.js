import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router'

class Auth extends React.Component {
  render() {
    return (
      <div className="authorize">
        <div className="container">
          <h1 className="text-center">Authorize Your Access</h1>
          <div className="center">
            <form>
              <div className="form-group">
                <label>Username:</label>
                <input className="form-control width-medium" />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input className="form-control width-medium" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/auth" component={Auth}/>
    </Router>
  ),
  document.getElementById('app')
);
