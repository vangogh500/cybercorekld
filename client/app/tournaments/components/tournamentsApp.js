import React from 'react'

import TournamentLeftNav from './tournamentLeftNav.js'

/**
 * Container for all user pages
 */
export default class TournamentsApp extends React.Component {
  /**
   * Handle mount event
   * Sets document title to
   */
  componentDidMount() {
    document.title = "CyberCore KLD - Tournaments"
    this.props.init()
  }
  /**
   * Renders {@link TournamentLeftNav} on the left and children on the right
   */
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
