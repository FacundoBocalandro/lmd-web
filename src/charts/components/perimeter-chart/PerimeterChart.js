import React from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";

const percentileData = {
    percentile97: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 38 + 0.087 * index})),
    percentile90: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 37 + 0.087 * index})),
    percentile75: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 36 + 0.087 * index})),
    percentile50: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 35 + 0.087 * index})),
    percentile25: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 34 + 0.087 * index})),
    percentile10: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 33 + 0.087 * index})),
    percentile3: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 32 + 0.087 * index})),
}

const data = Array(36).fill().map((value, index) => ({x: (19 / 228) * index + 8, y: 43 + 0.15 * index}))

const PerimeterChart = () => {
    return (
        <DelayedRendering>
            <GenericChart percentileData={percentileData}
                          maxY={60}
                          yStep={2}
                          yLabel={"Perímetro Cefálico (cm)"}
                          data={data}
                          colors={{grid: '#649CCD', stroke: 'red'}}/>
        </DelayedRendering>
    )
}

export default PerimeterChart;
