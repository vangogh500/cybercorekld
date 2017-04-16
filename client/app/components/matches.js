import React from 'react'

import MatchListing from './matchListing.js'

export default class Matches extends React.Component {
  render() {
    switch(this.props.status) {
      case 0:
        return (
          <div className="spinner">
            <div className="sk-cube-grid">
              <div className="sk-cube sk-cube1"></div>
              <div className="sk-cube sk-cube2"></div>
              <div className="sk-cube sk-cube3"></div>
              <div className="sk-cube sk-cube4"></div>
              <div className="sk-cube sk-cube5"></div>
              <div className="sk-cube sk-cube6"></div>
              <div className="sk-cube sk-cube7"></div>
              <div className="sk-cube sk-cube8"></div>
              <div className="sk-cube sk-cube9"></div>
            </div>
          </div>
        )
      case 200:
        return (
          <ul id="matches" className="list list-group">
            {this.props.ladderMatches.map((matchId) => {
              var match = this.props.matches[matchId]
              return (
                <MatchListing key={matchId} match={match} users={this.props.users} champions={this.props.champions} />
              )
            })}
          </ul>
        )
      default:
        return (
          <div></div>
        )
    }
  }
}
