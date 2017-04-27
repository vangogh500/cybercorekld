import React from 'react'
import Select from 'react-select'
import EditMatchForm from './editMatchForm.js'

const MODE_PICK_MATCH = "MODE_PICK_MATCH"

export default class BracketForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(value) {
    this.setState({ selected: value })
  }

  render() {
    const pickMatch = (
      <div>
        <div className="form-group text-center">
          <label>Pick a Match</label>
          <Select value={this.state.selected} onChange={this.handleSelect} options={this.props.matches.map((match) => { return { label: match.name, value: match } })} />
        </div>
      </div>
    )
    if(this.state.selected) {
      return (
        <div>
          {pickMatch}
          <EditMatchForm match={this.state.selected.value} />
        </div>
      )
    }
    else {
      return pickMatch
    }
  }
}
