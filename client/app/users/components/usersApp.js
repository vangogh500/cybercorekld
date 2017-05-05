import React from 'react'

export default class UsersApp extends React.Component {
  /**
   * Initializes the User App
   */
  componentDidMount() {
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
