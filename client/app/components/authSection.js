import React from 'react'
import { browserHistory } from 'react-router'

export default class AuthSection extends React.Component {

  componentWillMount() {
    if(this.props.status !== 200 && this.props.location.pathname !== '/auth') {
      alert('Unauthorized. Redirecting..')
      browserHistory.push('/auth')
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
