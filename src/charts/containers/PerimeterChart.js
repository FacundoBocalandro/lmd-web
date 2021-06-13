import {connect} from "react-redux";
import actions from "../../actions";
import PerimeterChart from "../components/perimeter-chart/PerimeterChart";


const mapStateToProps = state => ({
    averagePerimeterData: state.home.averagePerimeterData,
    userPerimeterHistory: state.home.userPerimeterHistory
})

const mapDispatchToProps = dispatch => ({
    getAveragePerimeterData: () => dispatch(actions.home.getAveragePerimeterData.request()),
    getUserPerimeterHistory: () => dispatch(actions.home.getUserPerimeterHistory.request()),
})


export default connect(mapStateToProps, mapDispatchToProps)(PerimeterChart);
