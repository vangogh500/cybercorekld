import { connect } from 'react-redux'
import { addUserToServer } from '../actions.js'
import ModalUserForm from '../components/modalUserForm.js'

const mapStateToProps = (state) => {
  console.log(state)
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (formData, cb) => {
      console.log("test")
      dispatch(addUserToServer(formData, cb))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserForm)
