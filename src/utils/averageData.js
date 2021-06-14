import {calculateAgeAtDate} from "./dates";

const MAX_PEDIATRIC_AGE = 19;

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
            percentileData.percentile97 = [...percentileData.percentile97, {
                x: MAX_PEDIATRIC_AGE / dataLength * index,
                y: monthData.p97
            }]
            percentileData.percentile90 = [...percentileData.percentile90, {
                x: MAX_PEDIATRIC_AGE / dataLength * index,
                y: monthData.p90
            }]
            percentileData.percentile75 = [...percentileData.percentile75, {
                x: MAX_PEDIATRIC_AGE / dataLength * index,
                y: monthData.p75
            }]
            percentileData.percentile50 = [...percentileData.percentile50, {
                x: MAX_PEDIATRIC_AGE / dataLength * index,
                y: monthData.p50
            }]
            percentileData.percentile25 = [...percentileData.percentile25, {
                x: MAX_PEDIATRIC_AGE / dataLength * index,
                y: monthData.p25
            }]
            percentileData.percentile10 = [...percentileData.percentile10, {
                x: MAX_PEDIATRIC_AGE / dataLength * index,
                y: monthData.p10
            }]
            percentileData.percentile3 = [...percentileData.percentile3, {
                x: MAX_PEDIATRIC_AGE / dataLength * index,
                y: monthData.p3
            }]
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
            percentileData.percentile97 = [...percentileData.percentile97, {
                x: MAX_PEDIATRIC_AGE / dataLength * index,
                y: monthData.p97
            }]
            percentileData.percentile50 = [...percentileData.percentile50, {
                x: MAX_PEDIATRIC_AGE / dataLength * index,
                y: monthData.p50
            }]
            percentileData.percentile3 = [...percentileData.percentile3, {
                x: MAX_PEDIATRIC_AGE / dataLength * index,
                y: monthData.p3
            }]
        })
    }

    return percentileData;
}

export const adaptUserHistoryData = (data, accessor, birthDate) => {
    const result = [...data.pastRecords.map(record => adaptDataRecord(record, accessor, birthDate)), ...adaptDataRecord(data.lastRecord, accessor, birthDate)];
    return result.filter((value, index) => result.findIndex(elem => elem.x === value.x) === index)
}

const adaptDataRecord = (record, accessor, birthDate) => {
    if (!record) return [];

    const recordDate = new Date(record.timeRecorded);
    const age = calculateAgeAtDate(new Date(birthDate), recordDate);

    return [{x: parseFloat(age), y: record[accessor]}]
}
