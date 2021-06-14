import {connect} from "react-redux";
import actions from "../../actions";
import VaccinesScreen from "../components/VaccinesScreen";

const mapStateToProps = state => ({
    allVaccines: state.vaccines.allVaccines
})

const mapDispatchToProps = dispatch => ({
    getAllVaccines: () => dispatch(actions.vaccines.getAllVaccines.request()),
    getUserVaccines: () => dispatch(actions.vaccines.getUserVaccines.request())
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccinesScreen);
