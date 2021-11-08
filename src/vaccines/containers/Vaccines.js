import {connect} from "react-redux";
import actions from "../../actions";
import VaccinesScreen from "../components/VaccinesScreen";

const mapStateToProps = state => ({
    allVaccines: state.vaccines.allVaccines,
    userVaccines: state.vaccines.userVaccines,
    userRole: state.session.userInfo?.userRole
})

const mapDispatchToProps = dispatch => ({
    getAllVaccines: () => dispatch(actions.vaccines.getAllVaccines.request()),
    getUserVaccines: () => dispatch(actions.vaccines.getUserVaccines.request()),
    exportVaccines: (callback) => dispatch(actions.vaccines.exportVaccines.request(callback)),
    createNewVaccine: (vaccine, callback) => dispatch(actions.vaccines.createNewVaccine.request(vaccine, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccinesScreen);
