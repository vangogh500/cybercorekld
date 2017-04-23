import React from 'react'

import TeamListing from './teamListing.js'

export default class Teams extends React.Component {
  render() {
    return (
      <ul className="list list-group">
        {
          this.props.teams.map((team) => {
            return (
              <TeamListing key={team.id} team={team}/>
            )
          })
        }
      </ul>
    )
  }
}
