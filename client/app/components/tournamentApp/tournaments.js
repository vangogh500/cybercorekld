import React from 'react'
import TournamentListing from './tournamentListing.js'

export default class Tournaments extends React.Component {
  render() {
    console.log(this.props.data)
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
  }
}
