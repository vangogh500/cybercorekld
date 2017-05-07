import React from 'react'
import { Link } from 'react-router'

const DEFAULT_THUMBNAIL = 'http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png'

export default class TournamentListItem extends React.Component {
  static get header() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading text-center dark-red text-white"><h4>Tournament Listing</h4></div>
      </div>
    )
  }

  getThumbnail(game) {
    switch(game) {
      case 'LoL':
        return 'https://yt3.ggpht.com/-AEerXPqHm3M/AAAAAAAAAAI/AAAAAAAAAAA/S8WpkwxItLQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg'
      default:
        return ''
    }
  }
  getColor(status) {
    switch(status) {
      case 'scheduled':
        return 'text-warning'
      case 'in progress':
        return 'text-success'
      default:
        return 'text-danger'
    }
  }
  render() {
    const date = new Date(this.props.tournament.date)
    const color = this.getColor(this.props.tournament.status)
    const thumbnail = this.getThumbnail(this.props.tournament.game)
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
