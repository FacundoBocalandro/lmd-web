import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";
import {GENDERS} from "../../../constants/PersonalData";
import Table from "../../../home/components/table/Table";

const HeightChart = ({getAverageHeightData, averageHeightData, getUserHeightHistory, userHeightHistory, gender, tableTabSelected}) => {
    useEffect(() => {
        if (!averageHeightData) getAverageHeightData();

        getUserHeightHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {userHeightHistory && tableTabSelected && <Table data={userHeightHistory} title={"Estatura"} accessor={"height"}/>}
            {averageHeightData && userHeightHistory && !tableTabSelected && <GenericChart percentileData={averageHeightData}
                                               maxY={190}
                                               minY={40}
                                               yStep={10}
                                               yLabel={"Estatura (cm)"}
                                               data={userHeightHistory}
                                               colors={{grid: gender === GENDERS.MALE ? '#6686CC' : 'pink', stroke: 'red'}}/>}
        </DelayedRendering>
    )
}

export default HeightChart;
