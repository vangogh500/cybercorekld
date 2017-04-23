import React from 'react'
import {BracketGenerator} from 'react-tournament-bracket'


export default class Bracket extends React.Component {
  render() {
    return (
      <div className="">
        <BracketGenerator games={this.props.matches}/>
      </div>
    )
  }
}
