import {connect} from 'react-redux'

import TournamentsApp from '../components/tournamentsApp.js'
import { fetchTournaments } from '../actions.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(fetchTournaments())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsApp)
