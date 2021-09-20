import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";
import {GENDERS} from "../../../constants/PersonalData";

const PerimeterChart = ({getAveragePerimeterData, averagePerimeterData, getUserPerimeterHistory, userPerimeterHistory, gender}) => {
    useEffect(() => {
        if (!averagePerimeterData) getAveragePerimeterData();

        getUserPerimeterHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {averagePerimeterData && userPerimeterHistory ? <GenericChart percentileData={averagePerimeterData}
                                                  maxY={60}
                                                  minY={28}
                                                  yStep={2}
                                                  yLabel={"Perímetro Cefálico (cm)"}
                                                  data={userPerimeterHistory} zoomOptions={[{min: 0, max: 2}, {min: 0, max: 6}]} selectedXRange={{min: 0, max: 6}}
                                                  colors={{grid: gender === GENDERS.MALE ? '#6686CC' : 'pink', stroke: 'red'}}/> : null}
        </DelayedRendering>
    )
}

export default PerimeterChart;
