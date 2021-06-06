import React from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";

const percentileData = {
    percentile97: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 5 + 0.35 * index})),
    percentile90: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 5 + 0.31 * index})),
    percentile75: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 5 + 0.28 * index})),
    percentile50: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 5 + 0.26 * index})),
    percentile25: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 5 + 0.23 * index})),
    percentile10: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 5 + 0.21 * index})),
    percentile3: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 5 + 0.18 * index})),
}

const data = Array(36).fill().map((value, index) => ({x: (19 / 228) * index + 8, y: 30 + 0.3 * index ^ 2}))

const WeightChart = () => {
    return (
        <DelayedRendering>
            <GenericChart percentileData={percentileData}
                          maxY={85}
                          yStep={5}
                          yLabel={"Peso (kg)"}
                          data={data}
                          colors={{grid: '#649CCD', stroke: 'red'}}/>
        </DelayedRendering>
    )
}

export default WeightChart;
