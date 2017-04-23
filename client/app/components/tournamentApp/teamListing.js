import React from 'react'

export default class TeamListing extends React.Component {
  render() {
    return (
      <li className="list-group-item">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6">
              <img className="ladder-icon margin-right-10" src="http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png" />
              <span>{this.props.team.name}</span>
            </div>
            <div className="col-xs-6">
              <div className="pull-right">
                <div className="pull-left margin-right-10">
                  <i className="fa fa-trophy text-yellow margin-right-10"></i>
                  <span>{this.props.team.trophies.filter((trophy) => (trophy.place === 1)).length}</span>
                </div>
                <div className="pull-left margin-right-10">
                  <i className="fa fa-trophy text-silver margin-right-10"></i>
                  <span>{this.props.team.trophies.filter((trophy) => (trophy.place === 2)).length}</span>
                </div>
                <div className="pull-left">
                  <i className="fa fa-trophy text-bronze margin-right-10"></i>
                  <span>{this.props.team.trophies.filter((trophy) => (trophy.place === 3)).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
