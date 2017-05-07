import { connect } from 'react-redux'
import UsersListing from '../components/usersListing.js'
import {subscribe} from '../../res/hocs.js'

const mapStateToProps = (state) => {
  return {
    data: state.users.userList.map((id) => state.users.users[id])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const UsersListingSync = connect(mapStateToProps, mapDispatchToProps)(UsersListing)

export default subscribe(UsersListingSync, "users")
