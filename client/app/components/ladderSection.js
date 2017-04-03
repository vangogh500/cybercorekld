import React from 'react'

import LadderLeftNav from './ladderleftnav.js'

export default class LadderSection extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-2">
          <LadderLeftNav active={this.props.location.pathname.slice(14)} />
        </div>
        {this.props.children}
      </div>
    )
  }
}
