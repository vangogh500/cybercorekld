import React from 'react'

export default class LadderListing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  showModal(e) {
    e.preventDefault()
    this.setState({ show: true })
  }

  closeModal(e) {
    e.preventDefault()
    this.setState({ show: false })
  }

  defaultClick(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  render() {
    var modal = () => {
      if(this.state.show) {
        return(
          <div className="modal-backdrop" onClick={this.closeModal}>
            <div className="modal show" id="ladderAddUserModal" role="dialog">
              <div className="modal-dialog" onClick={this.defaultClick}>
                <div className="modal-content">
                  <div className="modal-header">
                    <img className="ladder-icon pull-left" src="http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png" />
                    <h4 className="line-height-30 pull-left">{this.props.name}</h4>
                    <button type="button" className="btn btn-danger waves-effect pull-right">
                      <span className="fa fa-pencil"></span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="container">
                      <p><span className="profile-label">CSM: </span>{this.props.csm}</p>
                      <p><span className="profile-label">IGN: </span>{this.props.summonerName}</p>
                      <p><span className="profile-label">Name: </span>{this.props.name}</p>
                      <p><span className="profile-label">Email: </span>{this.props.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      else {
        return (
          <div></div>
        )
      }
    }
    return(
      <div>
        <li className="list-group-item" onClick={this.showModal}>
          <div className="row">
            <div className="col-xs-1">
              {this.props.index + "."}
            </div>
            <div className="col-xs-4">
              <img className="ladder-icon" src="http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png" />
              <span>{this.props.summonerName}</span>
            </div>
            <div className="col-xs-3">
              {this.props.name}
            </div>
            <div className="col-xs-2">
              1 day left
            </div>
            <div className="col-xs-2">
              {this.props.kp + " KP"}
            </div>
          </div>
        </li>
        { modal() }
      </div>
    )
  }
}
