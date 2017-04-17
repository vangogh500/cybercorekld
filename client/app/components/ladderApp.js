import React from 'react'

import LadderLeftNav from './ladderleftnav.js'

export default class LadderSection extends React.Component {
  componentDidMount() {
    document.title = "CyberCore KLD - Ladder"
    this.props.init()
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
