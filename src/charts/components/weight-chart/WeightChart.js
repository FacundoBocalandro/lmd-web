import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";
import {GENDERS} from "../../../constants/PersonalData";

const WeightChart = ({getAverageWeightData, averageWeightData, getUserWeightHistory, userWeightHistory, gender}) => {
    useEffect(() => {
        if (!averageWeightData) getAverageWeightData();

        getUserWeightHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {averageWeightData && userWeightHistory ? <GenericChart percentileData={averageWeightData}
                                               maxY={90}
                                               yStep={5}
                                               yLabel={"Peso (kg)"}
                                               data={userWeightHistory}
                                               colors={{grid: gender === GENDERS.MALE ? '#649CCD' : 'pink', stroke: 'red'}}/> : null}
        </DelayedRendering>
    )
}

export default WeightChart;
