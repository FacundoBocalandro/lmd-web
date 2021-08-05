import {connect} from "react-redux";
import actions from "../../actions";
import VaccineDetails from "../components/vaccine-details/VaccineDetails";

const mapStateToProps = state => ({
    vaccineDetails: state.vaccines.vaccineDetails
})

const mapDispatchToProps = dispatch => ({
    getVaccineDetails: (id) => dispatch(actions.vaccines.getVaccineDetails.request(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccineDetails);
