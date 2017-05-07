import React from 'react'
import TournamentListItem from './tournamentListItem.js'

export default class TournamentList extends React.Component {
  render() {
    return (
      <div>
        {TournamentListItem.header}
        <ul className="list list-group">
          {
            this.props.data.map((tournament) => {
              return (
                <TournamentListItem key={tournament.id} tournament={tournament}/>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
