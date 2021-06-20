import {connect} from "react-redux";
// import actions from "../../actions";
import VaccinesTable from "../components/vaccines-table/VaccinesTable";

const mapStateToProps = state => ({
    allVaccines: state.vaccines.allVaccines,
    userVaccines: state.vaccines.userVaccines
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccinesTable);
