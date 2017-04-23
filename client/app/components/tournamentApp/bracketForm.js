import React from 'react'
import Select from 'react-select'

const MODE_PICK_MATCH = "MODE_PICK_MATCH"

export default class BracketForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: MODE_PICK_MATCH
    }
  }
  render() {
    const pickMatch = (
      <h4>Pick a Game</h4>
    )
    switch(this.state.mode) {
      case MODE_PICK_MATCH:
        return pickMatch
      default:
        return <div></div>
    }
  }
}
