import React from 'react'

import TournamentLeftNav from './TournamentLeftNav.js'

export default class TournamentSection extends React.Component {
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
