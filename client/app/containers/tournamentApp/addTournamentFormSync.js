import { connect } from 'react-redux'
import { addTournamentToTournaments } from '../../actions/tournament.js'

import AddTournamentForm from '../../components/tournamentApp/addTournamentForm.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (tournament, cb) => {
      dispatch(addTournamentToTournaments(tournament, cb))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTournamentForm)
