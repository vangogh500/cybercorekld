import React from 'react'
import Autosuggest from 'react-autosuggest'

export default class AutoFillUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      suggestions: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.getSuggestions = this.getSuggestions.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length
    return inputLength === 0 ? [] : Object.keys(this.props.data).map((key) => this.props.data[key]).filter((user) => {
      return user.name.toLowerCase().indexOf(inputValue) !== -1 || user.csm.toLowerCase().indexOf(inputValue) !== -1 || user.ign.toLowerCase().indexOf(inputValue) !== -1
    })
  }

  getSuggestionValue(value) {
    this.props.onChange({
      target: {
        name: this.props.name,
        value: value.id
      }
    })
    return value.csm
  }

  renderSuggestion(value) {
    return (
      <div className="container-fluid autofill-item">
        <div className="row">
          <div className="col-xs-4">
            {value.csm}
          </div>
          <div className="col-xs-4">
            {value.name}
          </div>
          <div className="col-xs-4">
            {value.ign}
          </div>
        </div>
      </div>
    )
  }

  handleChange(e, { newValue }) {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    })
  }

  render() {
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: 'User',
      value,
      onChange: this.handleChange
    }

    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <Autosuggest
          className="z-depth-2"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}/>
      </div>
    )
  }
}
