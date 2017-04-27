import React from 'react'

export default class EditMatchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      homeScore: props.match.sides.home.score ? props.match.sides.home.score.score : "",
      visitorScore: (props.match.sides.visitor && props.match.sides.visitor.score) ? props.match.sides.visitor.score.score : ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      homeScore: nextProps.match.sides.home.score ? nextProps.match.sides.home.score.score : "",
      visitorScore: (nextProps.match.sides.visitor && nextProps.match.sides.visitor.score) ? nextProps.match.sides.visitor.score.score : ""
    })
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <form className="modal-form">
        <div className="form-group">
          <label>Team 1</label>
          <input className="form-control" value={this.props.match.sides.home.team.name} readOnly/>
        </div>
        <div className="form-group">
          <label>Score</label>
          <input name="homeScore" className="form-control" type="number" value={this.state.homeScore} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label>Team 2</label>
          <input className="form-control" value={(this.props.match.sides.visitor ? this.props.match.sides.visitor.team.name : "")} readOnly/>
        </div>
        <div className="form-group">
          <label>Score</label>
          <input name="visitorScore" className="form-control" type="number" value={this.state.visitorScore} onChange={this.handleChange} />
        </div>
      </form>
    )
  }
}
