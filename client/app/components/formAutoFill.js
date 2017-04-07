import React from 'react'

export default class FormAutoFill extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input type={this.props.type} className="form-control"/>
      </div>
    )
  }
}
