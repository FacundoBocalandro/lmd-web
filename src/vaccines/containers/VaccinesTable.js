import {connect} from "react-redux";
import VaccinesTable from "../components/vaccines-table/VaccinesTable";
import actions from "../../actions";

const mapStateToProps = state => ({
    allVaccines: state.vaccines.allVaccines,
    userVaccines: state.vaccines.userVaccines,
    userRole: state.session.userInfo?.userRole
})

const mapDispatchToProps = dispatch => ({
    submitNewVaccination: (vaccinationInfo, callback, errorCallback) => dispatch(actions.vaccines.submitNewVaccination.request(vaccinationInfo, callback, errorCallback)),
    updateVaccination: (id, vaccinationInfo, callback, errorCallback) => dispatch(actions.vaccines.updateVaccination.request(id, vaccinationInfo, callback, errorCallback)),
    deleteVaccination: (id, callback, errorCallback) => dispatch(actions.vaccines.deleteVaccination.request(id, callback, errorCallback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccinesTable);
