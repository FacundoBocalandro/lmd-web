import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";

const data = Array(36).fill().map((value, index) => ({x: (19 / 228) * index + 8, y: 100 + 0.5 * index ^ 2}))

const HeightChart = ({getAverageHeightData, averageHeightData, getUserHeightHistory, userHeightHistory}) => {
    useEffect(() => {
        if (!averageHeightData) getAverageHeightData();

        getUserHeightHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {averageHeightData ? <GenericChart percentileData={averageHeightData}
                                               maxY={190}
                                               minY={40}
                                               yStep={10}
                                               yLabel={"Estatura (cm)"}
                                               data={data}
                                               colors={{grid: '#649CCD', stroke: 'red'}}/> : null}
        </DelayedRendering>
    )
}

export default HeightChart;
