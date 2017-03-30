import React from 'react'

export default class LadderListing extends React.Component {
  render() {
    return(
      <li className="list-group-item">
        <div className="row">
          <div className="col-xs-1">
            {this.props.index + "."}
          </div>
          <div className="col-xs-5">
            <img className="ladder-icon" src="http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png" />
            <span>{this.props.summonerName}</span>
          </div>
          <div className="col-xs-2">
            {this.props.name}
          </div>
          <div className="col-xs-2">
            1 day left
          </div>
          <div className="col-xs-2">
            {this.props.kp + " KP"}
          </div>
        </div>
      </li>
    )
  }
}
