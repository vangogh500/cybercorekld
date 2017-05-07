import React from 'react'
import { connect } from 'react-redux'

import { STATUS_REQUEST, STATUS_PREREQUEST, STATUS_SUCCESS } from './numbers.js'
import { trimFormContent } from './util.js'
import LoadingAnimation from './components/loadingAnimation.js'

/**
 * Creates a form component out of the Component
 * @param {ReactComponent} WrappedComponent The component to wrap
 * @return {ReactComponent} Form component
 */
export function createForm(WrappedComponent) {
  /**
   * @type {ReactComponent}
   * @property {Function} constructor Constructor for the function. Sets state to WrappedComponent.initialState
   * @property {Function} handleChange Change handler for the form.
   * @property {Function} handleSubmit Submits the form content (uses props.submit)
   * @property {Function} render Renders the WrappedComponent and will pass valid as a prop
   */
  return class extends React.Component {
    constructor(props) {
      super(props)
      /**
       * @type {Object}
       * @property {status} status of the form
       */
      this.state = {
        ...WrappedComponent.initialState,
        status: STATUS_PREREQUEST
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    handleSubmit(e) {
      e.preventDefault()
      const formContent = trimFormContent(this.state)
      this.setState({ status: STATUS_REQUEST })
      this.props.onSubmit(formContent, (status) => {
        this.setState({ status: status })
      })
    }
    render() {
      const valid = this.component ? this.component.validate(this.state) : false
      return <WrappedComponent formData={this.state} valid={valid} ref={(component) => { this.component = component }} handleChange={this.handleChange} handleSubmit={this.handleSubmit} status={this.state.status} />
    }
  }
}

export function subscribe(WrappedComponent, appName) {
  const mapStateToProps = (state) => {
    return { status: state[appName].status }
  }
  const mapDispatchToProps = (dispatch) => {
    return {}
  }
  class Subscribed extends React.Component {
    render() {
      switch(this.props.status) {
        case STATUS_REQUEST:
          return <LoadingAnimation />
        case STATUS_SUCCESS:
          return React.cloneElement(<WrappedComponent location={this.props.location} params={this.props.params} />, this.props)
        default:
          return <span></span>
      }
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(Subscribed)
}
