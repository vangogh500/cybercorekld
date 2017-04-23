import React from 'react'
import { Link } from 'react-router'

const DEFAULT_THUMBNAIL = 'http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png'

export default class TournamentList extends React.Component {
  render() {
    const date = new Date(this.props.tournament.date)
    const color = (() => {
      switch(this.props.tournament.status) {
        case 'scheduled':
          return 'text-warning'
        case 'in progress':
          return 'text-success'
        default:
          return 'text-danger'
      }
    })()

    const thumbnail = this.props.tournament.img ? (this.props.tournament.img.thumbnail ? this.props.tournament.img.thumbnail : DEFAULT_THUMBNAIL ) : DEFAULT_THUMBNAIL

    return (
      <Link to={"/auth/tournament/" + this.props.tournament.id}>
        <li className="list-group-item">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-6">
                <img className="tournament-icon margin-right-10" src={thumbnail} />
                {this.props.tournament.name}
              </div>
              <div className="col-xs-6">
                <span className="text-grey margin-right-10">{date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}</span>
                <span className={"pull-right " + color}><i className="fa fa-circle margin-right-10"></i>{this.props.tournament.status}</span>
              </div>
            </div>
          </div>
        </li>
      </Link>
    )
  }
}
