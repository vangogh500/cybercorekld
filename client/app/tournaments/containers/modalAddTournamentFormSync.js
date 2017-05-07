import { connect } from 'react-redux'
import { addTournamentToServer } from '../actions.js'
import ModalAddTournamentForm from '../components/modalAddTournamentForm.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (formData, cb) => {
      formData.date = formData.date.format('YYYY-MM-DD')
      formData.game = formData.game.value
      formData.type = formData.type.value
      formData.status = formData.tournamentStatus ? formData.tournamentStatus.value : null
      if(!formData.status) delete formData.status
      delete formData.tournamentStatus
      dispatch(addTournamentToServer(formData, cb))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddTournamentForm)
