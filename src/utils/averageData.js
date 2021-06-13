export const adapt7PercentileData = (data) => {
    const percentileData = {
        percentile97: [],
        percentile90: [],
        percentile75: [],
        percentile50: [],
        percentile25: [],
        percentile10: [],
        percentile3: []
    }

    const dataLength = data.length;

    if (dataLength !== 0) {
        data.forEach((monthData, index) => {
            percentileData.percentile97 = [...percentileData.percentile97, {x: 19/dataLength * index, y: monthData.p97}]
            percentileData.percentile90 = [...percentileData.percentile90, {x: 19/dataLength * index, y: monthData.p90}]
            percentileData.percentile75 = [...percentileData.percentile75, {x: 19/dataLength * index, y: monthData.p75}]
            percentileData.percentile50 = [...percentileData.percentile50, {x: 19/dataLength * index, y: monthData.p50}]
            percentileData.percentile25 = [...percentileData.percentile25, {x: 19/dataLength * index, y: monthData.p25}]
            percentileData.percentile10 = [...percentileData.percentile10, {x: 19/dataLength * index, y: monthData.p10}]
            percentileData.percentile3 = [...percentileData.percentile3, {x: 19/dataLength * index, y: monthData.p3}]
        })
    }

    return percentileData;
}

export const adapt3PercentileData = (data) => {
    const percentileData = {
        percentile97: [],
        percentile50: [],
        percentile3: []
    }

    const dataLength = data.length;

    if (dataLength !== 0) {
        data.forEach((monthData, index) => {
            percentileData.percentile97 = [...percentileData.percentile97, {x: 19/dataLength * index, y: monthData.p97}]
            percentileData.percentile50 = [...percentileData.percentile50, {x: 19/dataLength * index, y: monthData.p50}]
            percentileData.percentile3 = [...percentileData.percentile3, {x: 19/dataLength * index, y: monthData.p3}]
        })
    }

    return percentileData;
}
