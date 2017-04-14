import React from 'react'

const LEFT = 0
const RIGHT = 1

const victory = (direction) => {
  if(LEFT) {
    return (
      <div className="inline-block">
        <h4 className="text-success fa fa-arrow-up display-inline"></h4>
        <h4 className="text-success display-inline"><b> Victory</b></h4>
      </div>
    )
  }
  else {
    return (
      <div className="inline-block">
        <h4 className="text-success display-inline"><b>Victory </b></h4>
        <h4 className="text-success fa fa-arrow-up display-inline"></h4>
      </div>
    )
  }
}

const loss = (direction) => {
  if(LEFT) {
    return (
      <div className="inline-block">
        <h4 className="text-danger fa fa-arrow-down"></h4>
        <h4 className="text-danger display-inline"><b> Loss</b></h4>
      </div>
    )
  }
  else {
    return (
      <div className="inline-block">
        <h4 className="text-danger display-inline"><b>Loss </b></h4>
        <h4 className="text-danger fa fa-arrow-down"></h4>
      </div>
    )
  }
}

var status = (direction, win) => {
  if(win) {
    return victory(direction)
  }
  else {
    return loss(direction)
  }
}

export default class MatchListing extends React.Component {
  render() {
    console.log(this.props)
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-xs-2">
            {status(LEFT, (this.props.match.winner === "player_one"))}
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
              {status(RIGHT, (this.props.match.winner === "player_two"))}
            </div>
          </div>
        </div>
      </li>
    )
  }
}
