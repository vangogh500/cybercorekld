import React from 'react'
import { Link } from 'react-router'


export default class TournamentListingApp extends React.Component {
  renderMiddle() {

  }
  render() {
    console.log(this.props)
    return (
      <div>
        <div className="col-xs-8">
          <h3 className="text-white">{this.props.tournament.name}</h3>
          <img className="banner" src={this.props.tournament.imgs.banner}/>
          <ul className="nav nav-tabs dark-red row row-fluid">
            {(this.props.selected === '') ? <li className="col-xs-4 active"><a>Teams</a></li> : <li className="col-xs-4"><Link to={'/auth/tournament/' + this.props.tournament.id}>Teams</Link></li>}
            {(this.props.selected === '/bracket') ? <li className="col-xs-4 active"><a>Bracket</a></li> : <li className="col-xs-4"><Link to={'/auth/tournament/' + this.props.tournament.id + '/bracket'}>Bracket</Link></li> }
          </ul>
          { (() => {
            console.log(this.props)
            return React.cloneElement(this.props.route.indexRoute.center, { tournament: this.props.tournament })
          })()}
        </div>
        <div className="col-xs-2">
          {React.cloneElement(this.props.route.indexRoute.right, { tournament: this.props.tournament })}
        </div>
      </div>
    )
  }
}
