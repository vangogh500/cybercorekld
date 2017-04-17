import React from 'react'

import Teams from './teams.js'

export default class TournamentPage extends React.Component {
  render() {
    return (
      <div className="col-xs-8">
        <div className="container-fluid">
          <div className="panel panel-default dark-red">
            <div className="panel-heading text-center"><h4>Teams</h4></div>
          </div>
          <Teams />
        </div>
      </div>
    )
  }
}
