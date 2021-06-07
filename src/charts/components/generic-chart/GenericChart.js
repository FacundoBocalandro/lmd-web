import React from "react";
import "./GenericChart.css";
import {
    createContainer,
    VictoryAxis,
    VictoryChart, VictoryLabel,
    VictoryLine, VictoryTooltip,
} from "victory";

const GenericChart = ({percentileData, maxY, yStep, yLabel, data, colors}) => {
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    const commonLineProps = (percentile) => ({
        labelComponent: <VictoryLabel style={{fontSize: 8, fontWeight: 'bold'}} dy={-3}/>,
        labels: ({datum}) => datum.x === 18.5 ? percentile : ''
    })

    return (
        <VictoryChart containerComponent={<VictoryZoomVoronoiContainer
            labels={({datum}) => `${Math.round(datum.x, 2)}, ${Math.round(datum.y, 2)}`}
            labelComponent={<VictoryTooltip centerOffset={{ x: 5 }} style={{fontSize: 8}}/>}
        />} width={550} height={550} minDomain={{x: 0}} maxDomain={{x: 19, y: maxY}}>
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
                         maxDomain={maxY}
                         tickValues={Array((maxY * 4 / yStep) + 1).fill(0).map((value, index) => (yStep/4)*index)}
                         tickFormat={value => value % yStep === 0 ? value : ''}
                         label={yLabel}
                         axisLabelComponent={<VictoryLabel dy={-10}/>}
            />
            <VictoryLine data={percentileData.percentile97} {...commonLineProps('97')} style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
            <VictoryLine data={percentileData.percentile90} {...commonLineProps('90')} style={{data: {strokeWidth: .7}}}/>
            <VictoryLine data={percentileData.percentile75} {...commonLineProps('75')} style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
            <VictoryLine data={percentileData.percentile50} {...commonLineProps('50')} style={{data: {strokeWidth: 1.5}}}/>
            <VictoryLine data={percentileData.percentile25} {...commonLineProps('25')} style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
            <VictoryLine data={percentileData.percentile10} {...commonLineProps('10')} style={{data: {strokeWidth: .7}}}/>
            <VictoryLine data={percentileData.percentile3} {...commonLineProps('3')} style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
            <VictoryLine data={data} style={{data: {stroke: colors.stroke}}}/>
        </VictoryChart>
    )
}

export default GenericChart;
