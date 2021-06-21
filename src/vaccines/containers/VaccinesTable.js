import {connect} from "react-redux";
import VaccinesTable from "../components/vaccines-table/VaccinesTable";
import actions from "../../actions";

const mapStateToProps = state => ({
    allVaccines: state.vaccines.allVaccines,
    userVaccines: state.vaccines.userVaccines
})

const mapDispatchToProps = dispatch => ({
    submitNewVaccination: (vaccinationInfo, callback, errorCallback) => dispatch(actions.vaccines.submitNewVaccination.request(vaccinationInfo, callback, errorCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccinesTable);
