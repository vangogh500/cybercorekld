import React from 'react'

import AuthFormSync from './containers/authFormSync.js'

export default class AuthPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading text-center"><h4>Authorize</h4></div>
          <div className="panel-body">
            <AuthFormSync />
          </div>
        </div>
      </div>
    )
  }
}
