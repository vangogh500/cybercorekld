import React from 'react'

/**
 * Container for all user pages
 */
export default class UsersApp extends React.Component {
  /**
   * propTypes
   * @property {Function} init Function to initialize users app.
   */
  static get propTypes() {
    return {
      init: React.PropTypes.func
    }
  }

  /**
   * Initializes the User App
   * @emits {ReduxAction} Props.init
   */
  componentDidMount() {
    this.props.init()
  }

  /**
   * Renders the wrapped children
   */
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
