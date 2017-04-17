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
        <li className="list-group-item">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-6">
                <img className="ladder-icon margin-right-10" src="http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png" />
                New Years Invitational
              </div>
              <div className="col-xs-6">
                <span className="text-grey margin-right-10">1/1/2016</span>
                <span className="text-danger pull-right"><i className="fa fa-circle margin-right-10"></i>completed</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}
