import React from 'react'

import TournamentLeftNav from './TournamentLeftNav.js'

export default class TournamentsApp extends React.Component {
  componentDidMount() {
    document.title = "CyberCore KLD - Tournaments"
    this.props.init()
  }
  render() {
    return (
      <div className="row">
        <div className="col-xs-2">
          <TournamentLeftNav active={this.props.location.pathname.slice(6)} />
        </div>
        {this.props.children}
      </div>
    )
  }
}
