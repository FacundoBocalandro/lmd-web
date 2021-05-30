import Home from "../components/Home";
import {connect} from "react-redux";
import actions from "../../actions";

const mapStateToProps = state => ({
    personalData: state.home.personalData
})

const mapDispatchToProps = dispatch => ({
    getPersonalData: () => dispatch(actions.home.getPersonalData.request()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
