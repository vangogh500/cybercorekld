import { connect } from 'react-redux'
import BracketForm from '../../components/tournamentApp/bracketForm.js'

const mapStateToProps = (state, ownProps) => {
  return {
    matches: state.tournament.tournaments[ownProps.tournamentId].matches.map((matchId) => {
      return state.tournament.matches[matchId]
    })
  }
}

const mapStateToDispatch = 
