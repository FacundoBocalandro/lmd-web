import Login from "../components/login/Login";
import {connect} from "react-redux";
import actions from "../../actions";

const mapStateToProps = state => ({
    loginPending: state.session.ui.loginPending
})

const mapDispatchToProps = dispatch => ({
    login: (form, callback, errorCallback) => dispatch(actions.session.login.request(form, callback, errorCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
