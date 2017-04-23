import React from 'react'

export default class TournamentRightPane extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -1
    }
    this.handleToggleStatus = this.handleToggleStatus.bind(this)
  }
  handleToggleStatus(e) {
    e.preventDefault()
    this.setState({ status: 0 })
    const pendingStatus = (() => {
      switch(this.props.tournament.status) {
        case 'scheduled':
          return 'in progress'
        case 'in progress':
          return 'scheduled'
        default:
          return 'completed'
      }
    })()
    this.props.toggleStatus(this.props.tournament.id, pendingStatus, (status) => {
      this.setState({ status: -1 })
    })
  }
  render() {
    console.log(this.props.tournament.status)
    const date = new Date(this.props.tournament.date)
    const color = (() => {
      switch(this.props.tournament.status) {
        case 'scheduled':
          return 'text-warning'
        case 'in progress':
          return 'text-success'
        default:
          return 'text-danger'
      }
    })()
    return (
      <div className="margin-right-10">
        <div className="panel panel-default">
          <div className="panel-body">
            <span className={color}><i className="fa fa-circle margin-right-10 margin-bottom-10"></i>{this.props.tournament.status}</span>
            <button disabled={(this.state.status === 0)} className="btn-sm btn-danger waves-effect width-100 block text-center" onClick={this.handleToggleStatus}><i className={(this.state.status == 0) ? "fa fa-spinner" : ((this.props.tournament.status === 'scheduled') ? "fa fa-play" : "fa fa-pause") }></i></button>
            <hr />
            <h5>Links</h5>
            <ul className="nav nav-pills nav-stacked">
              <li><a href={this.props.tournament.links ? this.props.tournament.links.fcbk : ""}><i className="fa fa-facebook-square"></i></a></li>
              <li><a href={this.props.tournament.links ? this.props.tournament.links.stream : ""}><i className="fa fa-video-camera"></i></a></li>
            </ul>
            <hr />
            <p><i className="fa fa-calendar margin-right-10"></i>{date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}</p>
            <p><i className="fa fa-users margin-right-10"></i>{this.props.tournament.teams.length + " teams"}</p>
          </div>
        </div>
      </div>
    )
  }
}
