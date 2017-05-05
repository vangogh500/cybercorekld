import React from 'react'

/**
 * Button which triggers it's child to be displayed modaly
 */
export default class ModalButton extends React.Component {
  /**
   * propTypes
   * @property {String} className The css class to be applied to the button
   * @property {ReactElement} label JSX to label the button
   * @property {ReactElement} children JSX to present in modal view
   */
  static get propTypes() {
    return {
      className: React.PropTypes.string,
      label: React.PropTypes.element,
      children: React.PropTypes.element
    }
  }

  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props)
    /**
     * @type {Object}
     * @property {Boolean} show=false Boolean whether to show the modal view
     */
    this.state = {
      show: false
    }
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.getModal = this.getModal.bind(this)
  }

  /**
   * Displays the modal content
   * @param {SyntheticEvent} e
   */
  showModal(e) {
    e.preventDefault()
    this.setState({ show: true })
  }

  /**
   * Hides the modal content
   * @param {SyntheticEvent} e
   */
  closeModal(e) {
    e.preventDefault()
    this.setState({ show: false })
  }

  /**
   * Handles clicks within the modal container and prevents propagation
   * @param {SyntheticEvent} e
   */
  defaultClick(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  /**
   * Renders the modal content depending on the state
   * @return {ReactElement} The prop.children wrapped by a modal.
   */
  getModal() {
    if(this.state.show) {
      return (
        <div className="modal-backdrop" onClick={this.closeModal}>
          <div className="modal show" role="dialog">
            <div className="modal-dialog" onClick={this.defaultClick}>
              {this.props.children}
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

  /**
   * Renders the button and the modal content
   * @return {ReactElement} The button gets rendered with the prop className and the prop label.
   */
  render() {
    return (
      <div>
        <button type="button" className={"btn btn-danger waves-effect " + this.props.className} data-toggle="modal" data-target="ladderAddUserModal" onClick={this.showModal}>
          {this.props.label}
        </button>
        {this.getModal()}
      </div>
    )
  }
}
