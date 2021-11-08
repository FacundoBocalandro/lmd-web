import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";
import HomeTable from "../../../home/components/table/HomeTable";

const WeightChart = ({getAverageWeightData, averageWeightData, getUserWeightHistory, userWeightHistory, tableTabSelected}) => {

    useEffect(() => {
        if (!averageWeightData) getAverageWeightData();

        getUserWeightHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {userWeightHistory && tableTabSelected && <HomeTable data={userWeightHistory} title={"Peso"} accessor={"weight"}/>}
            {averageWeightData && userWeightHistory && !tableTabSelected && <GenericChart percentileData={averageWeightData}
                                               maxY={90}
                                               yStep={5}
                                               yLabel={"Peso (kg)"}
                                               data={userWeightHistory} zoomOptions={[{min: 0, max: 2}, {min: 0, max: 6},{min: 0, max: 19}]}/>}
        </DelayedRendering>
    )
}

export default WeightChart;
