import { connect } from 'react-redux';
import Logout from './logout';
import * as Actions from './logoutActions';

const mapStateToProps = state => {
  return {
    loggingOut: state.logout.loggingOut,
    name: state.login.loggedInUser.name,
    login: state.login
  }
}
const mapDispatchToProps = {
  logOut: Actions.logOut,
  clearState: Actions.clearStateData
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);