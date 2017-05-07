import { connect } from 'react-redux'
import TournamentList from '../components/tournamentList.js'

import {subscribe} from '../../res/hocs.js'


const mapStateToProps = (state) => {
  console.log(state)
  return {
    data: state.tournaments.tournamentList.map((id) => state.tournaments.tournaments[id])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const TournamentListSync = connect(mapStateToProps, mapDispatchToProps)(TournamentList)

export default subscribe(TournamentListSync, "tournaments")
