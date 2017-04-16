import { connect } from 'react-redux'
import LadderApp from '../components/ladderApp.js'
import { fetchLadder, fetchChampions } from '../actions/ladder.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
 return {
   init: () => {
     dispatch(fetchLadder())
     dispatch(fetchChampions())
   }
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(LadderApp)
