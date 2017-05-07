import React from 'react'

import ModalButton from '../../res/components/modalbutton.js'
import ModalAddTournamentForm from '../containers/modalAddTournamentFormSync.js'

export default class ModalAddTournamentButton extends React.Component {
  render() {
    return (
      <ModalButton label={(<span>
          <span className="glyphicon glyphicon-plus"></span><i className="fa fa-calendar-o"></i>
        </span>)}>
        <div className="modal-content">
          <div className="modal-header">
            <h4>Add Tournament</h4>
          </div>
          <div className="modal-body">
            <ModalAddTournamentForm />
          </div>
        </div>
      </ModalButton>
    )
  }
}
