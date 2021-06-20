import React from "react";
import "./GenericChart.css";
import {
    createContainer,
    VictoryAxis,
    VictoryChart, VictoryLabel,
    VictoryLine, VictoryScatter, VictoryTooltip,
} from "victory";

const GenericChart = ({percentileData, maxY, minY = 0, yStep, yLabel, data, colors}) => {
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
    const maxYToDisplay = Math.max(getMaxY(data), maxY);
    const minYToDisplay = Math.min(getMinY(data), minY);

    const commonLineProps = (percentile) => {
        const lineData = percentileData[`percentile${percentile}`];

        return {
            labelComponent: <VictoryLabel style={{fontSize: 8, fontWeight: 'bold'}} dy={-3}/>,
            labels: ({datum}) => datum.x === lineData[lineData.length - 5].x ? percentile : ''
        }
    }

    return (
        <VictoryChart containerComponent={<VictoryZoomVoronoiContainer
            labels={({datum}) => `${Math.round(datum.x, 2)}, ${Math.round(datum.y, 2)}`}
            labelComponent={<VictoryTooltip centerOffset={{x: 5}} style={{fontSize: 8}}/>}
        />} width={550} height={550} minDomain={{x: 0, y: minYToDisplay}} maxDomain={{x: 19, y: maxYToDisplay}}>
            <VictoryAxis crossAxis
                         minDomain={0}
                         maxDomain={19}
                         tickValues={Array(115).fill(0).map((value, index) => (19 / 114) * index)}
                         tickFormat={value => value % 1 === 0 ? value : ''}
                         style={{tickLabels: {fontSize: 10}, grid: {stroke: colors.grid}, axisLabel: {fontSize: 12}}}
                         standalone={false}
                         label={"Edad (años)"}
            />
            <VictoryAxis dependentAxis crossAxis
                         style={{tickLabels: {fontSize: 10}, grid: {stroke: colors.grid}, axisLabel: {fontSize: 12}}}
                         standalone={false}
                         minDomain={minYToDisplay}
                         maxDomain={maxYToDisplay}
                         tickValues={Array(((maxYToDisplay - minYToDisplay) * 4 / yStep) + 1).fill(0).map((value, index) => (yStep / 4) * index + minYToDisplay)}
                         tickFormat={value => value % yStep === 0 ? value : ''}
                         label={yLabel}
                         axisLabelComponent={<VictoryLabel dy={-10}/>}
            />
            <VictoryLine data={percentileData.percentile97} {...commonLineProps('97')}
                         style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
            {percentileData.percentile90 && <VictoryLine data={percentileData.percentile90} {...commonLineProps('90')}
                         style={{data: {strokeWidth: .7}}}/>}
            {percentileData.percentile75 && <VictoryLine data={percentileData.percentile75} {...commonLineProps('75')}
                         style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>}
            <VictoryLine data={percentileData.percentile50} {...commonLineProps('50')}
                         style={{data: {strokeWidth: 1.5}}}/>
            {percentileData.percentile25 && <VictoryLine data={percentileData.percentile25} {...commonLineProps('25')}
                         style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>}
            {percentileData.percentile10 && <VictoryLine data={percentileData.percentile10} {...commonLineProps('10')}
                         style={{data: {strokeWidth: .7}}}/>}
            <VictoryLine data={percentileData.percentile3} {...commonLineProps('3')}
                         style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
            {data.length === 1 ? <VictoryScatter data={data} style={{data: {fill: colors.stroke}}}/> : <VictoryLine data={data} style={{data: {stroke: colors.stroke}}}/>}
        </VictoryChart>
    )
}

const getMaxY = (data) => {
    let maxY = 0;
    data.forEach(value => {
        if (value.y > maxY) maxY = value.y
    })
    return maxY;
}

const getMinY = (data) => {
    let minY = 0;
    data.forEach(value => {
        if (value.y < minY) minY = value.y
    })
    return minY;
}

export default GenericChart;
