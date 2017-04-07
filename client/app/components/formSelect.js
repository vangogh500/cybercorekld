import React from 'react'

export default class FormSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({ selected: e.target.name })
  }

  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <div className="btn-group width-100 select-group">
          <button className="select form-control" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.selected ? this.state.selected : this.props.label}</button>
          <div className="dropdown-menu dropdown-danger">
            <h3 className="dropdown-header">{this.props.label}</h3>
            {
              this.props.options.map((lbl, idx) => {
                return (
                  <a key={lbl + idx} name={lbl} className="dropdown-item" onClick={this.handleClick}>{lbl}</a>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
