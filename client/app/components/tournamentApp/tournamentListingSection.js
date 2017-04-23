import React from 'react'
import { Link } from 'react-router'

import LoadingAnimation from '../loadingAnimation.js'

export default class TournamentListingSection extends React.Component {
  render() {
    switch(this.props.status) {
      case -1:
      case 0:
        return <LoadingAnimation />
      default:
        const path = this.props.location.pathname.slice(17 + this.props.tournament.id.length)
        return (
          <div>
            <div className="col-xs-8">
              <h3 className="text-white">{this.props.tournament.name}</h3>
              <img className="banner" src={this.props.tournament.img.banner}/>
              <ul className="nav nav-tabs dark-red row row-fluid">
                {(path === '') ? <li className="col-xs-4 active"><a>Teams</a></li> : <li className="col-xs-4"><Link to={'/auth/tournament/' + this.props.tournament.id}>Teams</Link></li>}
                {(path === '/bracket') ? <li className="col-xs-4 active"><a>Bracket</a></li> : <li className="col-xs-4"><Link to={'/auth/tournament/' + this.props.tournament.id + '/bracket'}>Bracket</Link></li> }
              </ul>
              {React.cloneElement(this.props.center, { tournament: this.props.tournament })}
            </div>
            <div className="col-xs-2">
              {React.cloneElement(this.props.right, { tournament: this.props.tournament })}
            </div>
          </div>
        )
    }
  }
}
