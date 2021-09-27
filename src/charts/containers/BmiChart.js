import {connect} from "react-redux";
import actions from "../../actions";
import BmiChart from "../components/bmi-chart/BmiChart";


const mapStateToProps = state => ({
    averageBmiData: state.home.averageBmiData,
    userBmiHistory: state.home.userBmiHistory
})

const mapDispatchToProps = dispatch => ({
    getAverageBmiData: () => dispatch(actions.home.getAverageBmiData.request()),
    getUserBmiHistory: () => dispatch(actions.home.getUserBmiHistory.request()),
})


export default connect(mapStateToProps, mapDispatchToProps)(BmiChart);
