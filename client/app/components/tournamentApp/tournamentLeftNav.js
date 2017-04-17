import React from 'react'
import { Link } from 'react-router'

export default class LadderLeftNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: props.active,
      active: props.active
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseExit = this.handleMouseExit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      location: nextProps.active,
      active: nextProps.active
    })
  }

  handleMouseEnter(e) {
    if(this.state.active == 'tournaments') {
      this.setState({ active: 'tournaments/teams'})
    }
    else {
      this.setState({ active: 'tournaments' })
    }
  }

  handleMouseExit(e) {
    if(this.state.active == 'tournaments/teams') {
      this.setState({ active: 'tournaments' })
    }
    else {
      this.setState({ active: 'tournaments/teams' })
    }
  }

  render() {
    return (
      <div id="left-nav" className="panel panel-default">
        <div className="panel-heading text-center z-depth-2"><h4>Navigate</h4></div>
        {
          (this.state.location == 'tournaments') ? (
            <ul className="nav nav-pills nav-stacked" role="tablist">
              <li className={"nav-item " + (this.state.active == 'tournaments' ? 'active z-depth-4' : 'z-depth-2')}>
                  <a className="nav-link" data-toggle="tab" role="tab">Tournaments</a>
              </li>
              <li className={"nav-item " + (this.state.active == 'tournaments/teams' ? 'active z-depth-4' : 'z-depth-2')} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
                <Link to="/auth/tournaments/teams" className="nav-link" data-toggle="tab" role="tab">Teams</Link>
              </li>
            </ul>
          ) : (
            <ul className="nav nav-pills nav-stacked" role="tablist">
              <li className={"nav-item " + (this.state.active == 'tournaments' ? 'active z-depth-4' : 'z-depth-2')} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
                  <Link to="/auth/tournaments" className="nav-link" data-toggle="tab" role="tab">Tournaments</Link>
              </li>
              <li className={"nav-item " + (this.state.active == 'tournaments/teams' ? 'active z-depth-4' : 'z-depth-2')}>
                  <a className="nav-link" data-toggle="tab" role="tab">Teams</a>
              </li>
            </ul>
          )
        }
      </div>
    )
  }
}
