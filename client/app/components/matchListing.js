import React from 'react'

const LEFT = 0
const RIGHT = 1

const winCondition = (winCondition) => {
  switch(winCondition) {
    case 'fb':
      return 'First blood'
    case 'ft':
      return 'First tower'
    case 'cs':
      return 'First to 100 cs'
    default:
      return 'error'
  }
}

const victory = (direction, d_kp) => {
  if(d_kp > 0) d_kp = "+" + d_kp
  if(LEFT === direction) {
    return (
      <div className="inline-block">
        <h4 className="text-success fa fa-arrow-up display-inline"></h4>
        <h4 className="text-success display-inline"><b>{" " + d_kp}</b></h4>
      </div>
    )
  }
  else {
    return (
      <div className="inline-block">
        <h4 className="text-success display-inline"><b>{d_kp + " "}</b></h4>
        <h4 className="text-success fa fa-arrow-up display-inline"></h4>
      </div>
    )
  }
}

const loss = (direction, d_kp) => {
  if(d_kp > 0) d_kp = "+" + d_kp
  if(LEFT === direction) {
    return (
      <div className="inline-block">
        <h4 className="text-danger fa fa-arrow-down"></h4>
        <h4 className="text-danger display-inline"><b>{" " + d_kp}</b></h4>
      </div>
    )
  }
  else {
    return (
      <div className="inline-block">
        <h4 className="text-danger display-inline"><b>{d_kp + " "}</b></h4>
        <h4 className="text-danger fa fa-arrow-down"></h4>
      </div>
    )
  }
}

var status = (direction, win, d_kp) => {
  if(win) {
    return victory(direction, d_kp)
  }
  else {
    return loss(direction, d_kp)
  }
}

export default class MatchListing extends React.Component {
  render() {
    return (
      <li className="">
        <a className="list-group-item list-item-dropdown" data-toggle="collapse" href={"#collapse-" + this.props.match.id} aria-expanded="false">
          <div className="row">
            <div className="col-xs-2">
              {status(LEFT, (this.props.match.winner === "player_one"), this.props.match.d_kp.player_one)}
            </div>
            <div className="col-xs-3 text-center">
              <div className="inline-block">
                <h4 className="display-inline">{this.props.users[this.props.match.player_one._user].ign + " "}</h4>
                <img className="sprite" src={"http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/" + this.props.champions[this.props.match.player_one.champion].image.full} />
              </div>
            </div>
            <div className="col-xs-2 text-center">
              VS
            </div>
            <div className="col-xs-3 text-center">
              <div className="inline-block">
                <h4 className="display-inline">{this.props.users[this.props.match.player_two._user].ign + " "}</h4>
                <img className="sprite" src={"http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/" + this.props.champions[this.props.match.player_two.champion].image.full}  />
              </div>
            </div>
            <div className="col-xs-2">
              <div className="inline-block">
                {status(RIGHT, (this.props.match.winner === "player_two"), this.props.match.d_kp.player_two)}
              </div>
            </div>
          </div>
        </a>
        <div className="collapse dark-grey" id={"collapse-" + this.props.match.id}>
          <div className="panel-body text-white">
            <div className="row row-eq-height">
              <div className="col-xs-2 text-center">
                <span>{winCondition(this.props.match.win_condition)}</span>
                <hr />
                {new Date(this.props.match.date).toLocaleString()}
              </div>
              <div className="col-xs-5 center-container">
                <div>
                  <h4 className="pull-left margin-right-10">{this.props.match.initial_kp.player_one}</h4>
                  <h4 className={"pull-left margin-right-10 " + (this.props.match.winner === 'player_one' ? 'text-success' : 'text-danger')}><i className="fa fa-arrow-right"></i></h4>
                  <h4 className="pull-left">{this.props.match.initial_kp.player_one + this.props.match.d_kp.player_one}</h4>
                </div>
              </div>
              <div className="col-xs-5 center-container">
                <div>
                  <h4 className="pull-left margin-right-10">{this.props.match.initial_kp.player_two}</h4>
                  <h4 className={"pull-left margin-right-10 " + (this.props.match.winner === 'player_two' ? 'text-success' : 'text-danger')}><i className="fa fa-arrow-right"></i></h4>
                  <h4 className={"pull-left margin-left-10"}>{this.props.match.initial_kp.player_two + this.props.match.d_kp.player_two}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
