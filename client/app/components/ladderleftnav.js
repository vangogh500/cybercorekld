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
    if(this.state.active == 'ladder') {
      this.setState({ active: 'matches'})
    }
    else {
      this.setState({ active: 'ladder' })
    }
  }

  handleMouseExit(e) {
    if(this.state.active == 'matches') {
      this.setState({ active: 'ladder' })
    }
    else {
      this.setState({ active: 'matches' })
    }
  }

  render() {
    return (
      <div id="left-nav" className="panel panel-default">
        <div className="panel-heading text-center z-depth-2"><h4>Navigate</h4></div>
        {
          (this.state.location == 'ladder') ? (
            <ul className="nav nav-pills nav-stacked" role="tablist">
              <li className={"nav-item " + (this.state.active == 'ladder' ? 'active z-depth-4' : 'z-depth-2')}>
                  <a className="nav-link" data-toggle="tab" role="tab">Ladder</a>
              </li>
              <li className={"nav-item " + (this.state.active == 'matches' ? 'active z-depth-4' : 'z-depth-2')} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
                <Link to="/auth/onevone/matches" className="nav-link" data-toggle="tab" role="tab">Matches</Link>
              </li>
            </ul>
          ) : (
            <ul className="nav nav-pills nav-stacked" role="tablist">
              <li className={"nav-item " + (this.state.active == 'ladder' ? 'active z-depth-4' : 'z-depth-2')} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
                  <Link to="/auth/onevone/ladder" className="nav-link" data-toggle="tab" role="tab">Ladder</Link>
              </li>
              <li className={"nav-item " + (this.state.active == 'matches' ? 'active z-depth-4' : 'z-depth-2')}>
                  <a className="nav-link" data-toggle="tab" role="tab">Matches</a>
              </li>
            </ul>
          )
        }
      </div>
    )
  }
}
