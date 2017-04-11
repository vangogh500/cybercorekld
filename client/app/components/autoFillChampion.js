import React from 'react'
import Autosuggest from 'react-autosuggest'

export default class AutoFillChampion extends React.Component {
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
    return inputLength === 0 ? [] : this.props.data.filter((champion) => {
      return champion.name.toLowerCase().indexOf(inputValue) !== -1
    })
  }

  getSuggestionValue(value) {
    this.props.onClick(this.props.path, value.id)
    return value.name
  }

  renderSuggestion(value) {
    return (
      <div className="container-fluid autofill-item">
        <div className="row">
          <div className="col-xs-6">
            <img className="sprite" src={'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + value.image.full} />
          </div>
          <div className="col-xs-6 line-height-40">
            {value.name}
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
      placeholder: 'Champion',
      value,
      onChange: this.handleChange
    }

    return (
      <div className="form-group">
        <label>Champion</label>
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
