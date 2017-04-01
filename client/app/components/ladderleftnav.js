import React from 'react'

export default class LadderLeftNav extends React.Component {
  render() {
    return (
      <div id="left-nav" className="panel panel-default">
        <div className="panel-heading text-center z-depth-2"><h4>Navigate</h4></div>
        <ul className="nav nav-pills nav-stacked" role="tablist">
          <li className="nav-item active z-depth-4">
              <a className="nav-link" data-toggle="tab" role="tab">Ladder</a>
          </li>
          <li className="nav-item z-depth-2">
              <a className="nav-link" data-toggle="tab" role="tab">Matches</a>
          </li>
        </ul>
      </div>
    )
  }
}
