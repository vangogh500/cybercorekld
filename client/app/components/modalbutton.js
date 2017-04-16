import React from 'react'

export default class ModalButton extends React.Component {
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
        return (
          <div className="modal-backdrop" onClick={this.closeModal}>
            <div className="modal show" id="ladderAddUserModal" role="dialog">
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
    return (
      <div>
        <button id={this.props.id} type="button" className={"btn btn-danger waves-effect " + this.props.className} data-toggle="modal" data-target="ladderAddUserModal" onClick={this.showModal}>
          {this.props.label}
        </button>
        {modal()}
      </div>
    )
  }
}
