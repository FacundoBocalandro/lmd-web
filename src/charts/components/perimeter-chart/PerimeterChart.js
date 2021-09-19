import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";
import {GENDERS} from "../../../constants/PersonalData";
import Table from "../../../home/components/table/Table";

const PerimeterChart = ({getAveragePerimeterData, averagePerimeterData, getUserPerimeterHistory, userPerimeterHistory, gender, tableTabSelected}) => {
    useEffect(() => {
        if (!averagePerimeterData) getAveragePerimeterData();

        getUserPerimeterHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {userPerimeterHistory && tableTabSelected && <Table data={userPerimeterHistory} title={"Perímetro Céfalico"} accessor={"perimeter"} noZScore/>}
            {averagePerimeterData && userPerimeterHistory && !tableTabSelected && <GenericChart percentileData={averagePerimeterData}
                                                  maxY={60}
                                                  minY={28}
                                                  yStep={2}
                                                  yLabel={"Perímetro Cefálico (cm)"}
                                                  data={userPerimeterHistory}
                                                  colors={{grid: gender === GENDERS.MALE ? '#6686CC' : 'pink', stroke: 'red'}}/>}
        </DelayedRendering>
    )
}

export default PerimeterChart;
