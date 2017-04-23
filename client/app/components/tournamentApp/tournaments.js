import React from 'react'

import TournamentListing from './tournamentListing.js'
import LoadingAnimation from '../loadingAnimation.js'

export default class Tournaments extends React.Component {
  render() {
    switch(this.props.status) {
      case 0:
        return <LoadingAnimation />
      case 200:
        return (
          <ul className="list list-group">
            {
              this.props.data.map((tournament) => {
                return (
                  <TournamentListing key={tournament.id} tournament={tournament}/>
                )
              })
            }
          </ul>
        )
      default:
        return (<div></div>)
    }
  }
}
