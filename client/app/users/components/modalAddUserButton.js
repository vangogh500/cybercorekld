import React from 'react'
import ModalButton from '../../res/components/modalbutton.js'
import { MODAL_USER_FORM_TITLE } from '../res/strings.js'
import ModalUserForm from '../containers/modalUserFormSync.js'

/**
 * Users Home Page
 * <p>Contains:
 * <ul style="list-style">
 *    <li> {@link ModalUserForm} </li>
 * </ul></p>
 */
export default class ModalAddUserButton extends React.Component {
  /**
   * Renders the modal button for the add user form
   * @return {ReactElement} Bootstrap button
   */
  render() {
    return (
      <ModalButton label={(<span>
          <span className="glyphicon glyphicon-plus"></span><i className="fa fa-user"></i>
        </span>)}>
        <div className="modal-content">
          <div className="modal-header">
            <h4>{MODAL_USER_FORM_TITLE}</h4>
          </div>
          <div className="modal-body">
            <ModalUserForm />
          </div>
        </div>
      </ModalButton>
    )
  }
}
