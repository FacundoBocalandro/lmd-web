import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";

const data = Array(36).fill().map((value, index) => ({x: (19 / 228) * index + 8, y: 30 + 0.3 * index ^ 2}))

const WeightChart = ({getAverageWeightData, averageWeightData, getUserWeightHistory, userWeightHistory}) => {
    useEffect(() => {
        if (!averageWeightData) getAverageWeightData();

        getUserWeightHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {averageWeightData ? <GenericChart percentileData={averageWeightData}
                                               maxY={90}
                                               yStep={5}
                                               yLabel={"Peso (kg)"}
                                               data={data}
                                               colors={{grid: '#649CCD', stroke: 'red'}}/> : null}
        </DelayedRendering>
    )
}

export default WeightChart;
