import Register from "../components/register/Register";
import {connect} from "react-redux";
import actions from "../../actions";

const mapStateToProps = state => ({
    checkUsernameUsedPending: state.session.ui.checkUsernameUsedPending,
    checkUsernameUsedError: state.session.ui.checkUsernameUsedError,
    registerPending: state.session.ui.registerPending
})

const mapDispatchToProps = dispatch => ({
    registerUser: (user, callback, errorCallback) => dispatch(actions.session.registerUser.request(user, callback, errorCallback)),
    checkUsernameUsed: (username, callback, errorCallback) => dispatch(actions.session.checkUsernameUsed.request(username, callback, errorCallback))
})


export default connect(mapStateToProps, mapDispatchToProps)(Register);
