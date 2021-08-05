import Login from "../components/login/Login";
import {connect} from "react-redux";
import actions from "../../actions";

const mapStateToProps = state => ({
    loginPending: state.session.ui.loginPending,
    allUsersInfo: state.session.allUsersInfo
})

const mapDispatchToProps = dispatch => ({
    login: (form, callback, errorCallback) => dispatch(actions.session.login.request(form, callback, errorCallback)),
    getUserInfoFromToken: (token) => dispatch(actions.session.getUserInfoFromToken.request(token)),
    logout: () => dispatch(actions.session.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
