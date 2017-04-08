import React from 'react'
import AutoFillItemUser from './autoFillItemUser.js'
import AutoFillItemChampion from './autoFillItemChampion.js'

export default class FormAutoFill extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      show: false,
      suggested: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(e, target) {
    e.preventDefault()
    this.setState({
      value: target.join('')
    })
    this.props.onChange(e, this.props.path, target.join(''))
  }

  handleChange(e) {
    var value = e.target.value.toLowerCase()
    var suggestions = this.props.data.map(entry => {
      var newEntry = Object.assign({}, entry)
      delete newEntry.email
      delete newEntry.__v
      return newEntry
    })
    var regex = new RegExp('(' + value + ')', 'i')
    suggestions = suggestions.filter(entry => {
      var valid = false
      for(var property in entry) {
        if(value && typeof(entry[property]) == 'string' && entry[property].toLowerCase().indexOf(value) !== -1) {
          entry[property] = entry[property].split(regex, -1).filter(substr => substr)
          valid = true
        }
        else {
          entry[property] = [entry[property]]
        }
      }
      return valid
    })
    this.setState({
      value: e.target.value,
      suggested: suggestions
    })
  }
  render() {
    var boldSubString = (arr) => {
      return (
        arr.map((substr, idx) => {
          if(substr.toLowerCase() == this.state.value.toLowerCase()) return (<b className="highlight" key={substr + idx + 'autofill-item bold' + this.state.value }>{substr}</b>)
          else return (<span key={substr + idx + 'autofill-item' + this.state.value}>{substr}</span>)
        })
      )
    }
    return (
      <div className="autofill-container">
        <div className="form-group">
          <label>{this.props.label}</label>
          <input type="text" value={this.state.value} className="form-control" onChange={this.handleChange}/>
          <ul className="autofill z-depth-2">
            {
              this.state.suggested.map((entry) => {
                if(this.props.type === "user") {
                  return (
                    <AutoFillItemUser id={entry.id} onClick={this.handleClick} search={this.state.value} key={entry.id + 'autofill' + this.state.value} csm={entry.csm} ign={entry.ign} name={entry.name}/>
                  )
                }
                else if(this.props.type === "champion") {
                  return (
                    <AutoFillItemChampion id={entry.id} onClick={this.handleClick} search={this.state.value} key={entry.id + 'autofill' + this.state.value} name={entry.name} imgSrc={entry.image["0"].full} />
                  )
                }
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}
