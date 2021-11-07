import {connect} from "react-redux";
import actions from "../../actions";
import VaccineApplications from "../components/vaccine-applications/VaccineApplications";

const mapStateToProps = state => ({
    vaccineApplications: state.vaccines.vaccineApplications
})

const mapDispatchToProps = dispatch => ({
    getVaccineApplications: (id) => dispatch(actions.vaccines.getVaccineApplications.request(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccineApplications);
