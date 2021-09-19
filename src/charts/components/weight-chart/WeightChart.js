import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";
import {GENDERS} from "../../../constants/PersonalData";
import Table from "../../../home/components/table/Table";

const WeightChart = ({getAverageWeightData, averageWeightData, getUserWeightHistory, userWeightHistory, gender, tableTabSelected}) => {

    useEffect(() => {
        if (!averageWeightData) getAverageWeightData();

        getUserWeightHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {userWeightHistory && tableTabSelected && <Table data={userWeightHistory} title={"Peso"} accessor={"weight"}/>}
            {averageWeightData && userWeightHistory && !tableTabSelected && <GenericChart percentileData={averageWeightData}
                                               maxY={90}
                                               yStep={5}
                                               yLabel={"Peso (kg)"}
                                               data={userWeightHistory}
                                               colors={{grid: gender === GENDERS.MALE ? '#6686CC' : 'pink', stroke: 'red'}}/>}
        </DelayedRendering>
    )
}

export default WeightChart;
