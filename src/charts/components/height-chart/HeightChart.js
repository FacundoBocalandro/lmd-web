import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";
import {GENDERS} from "../../../constants/PersonalData";

const HeightChart = ({getAverageHeightData, averageHeightData, getUserHeightHistory, userHeightHistory, gender}) => {
    useEffect(() => {
        if (!averageHeightData) getAverageHeightData();

        getUserHeightHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {averageHeightData && userHeightHistory ? <GenericChart percentileData={averageHeightData}
                                               maxY={190}
                                               minY={40}
                                               yStep={10}
                                               yLabel={"Estatura (cm)"}
                                               data={userHeightHistory}
                                               colors={{grid: gender === GENDERS.MALE ? '#6686CC' : 'pink', stroke: 'red'}}/> : null}
        </DelayedRendering>
    )
}

export default HeightChart;
