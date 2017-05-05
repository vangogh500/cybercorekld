import React from 'react'

import Teams from './teams.js'
import AddTeamFormSync from '../../containers/tournamentApp/addTeamFormSync.js'
import ModalButton from '../../res/components/modalbutton.js'

class Center extends React.Component {
  render() {
    return (
      <Teams teams={this.props.tournament.teams} />
    )
  }
}

class ModalAddTeam extends React.Component {
  render() {
    return (
      <ModalButton label={(<span>
          <span className="glyphicon glyphicon-plus"></span><i className="fa fa-users"></i>
        </span>)}>
        <div className="modal-content">
          <div className="modal-header">
            <h4>Add Team</h4>
          </div>
          <div className="modal-body">
            <AddTeamFormSync tournamentId={this.props.tournament.id} />
          </div>
        </div>
      </ModalButton>
    )
  }
}

export default {
  center: Center,
  right: ModalAddTeam
}
