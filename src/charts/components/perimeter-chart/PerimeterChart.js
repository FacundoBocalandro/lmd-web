import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";
import Table from "../../../home/components/table/Table";

const PerimeterChart = ({
                            getAveragePerimeterData,
                            averagePerimeterData,
                            getUserPerimeterHistory,
                            userPerimeterHistory,
                            tableTabSelected
                        }) => {
    useEffect(() => {
        if (!averagePerimeterData) getAveragePerimeterData();

        getUserPerimeterHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {userPerimeterHistory && tableTabSelected &&
            <Table data={userPerimeterHistory} title={"Perímetro Céfalico"} accessor={"perimeter"} noZScore/>}
            {averagePerimeterData && userPerimeterHistory && !tableTabSelected &&
            <GenericChart percentileData={averagePerimeterData}
                          maxY={60}
                          minY={28}
                          yStep={2}
                          yLabel={"Perímetro Cefálico (cm)"}
                          data={userPerimeterHistory} zoomOptions={[{min: 0, max: 2}, {min: 0, max: 6}]}
                          selectedXRange={{min: 0, max: 6}}/>}
        </DelayedRendering>
    )
}

export default PerimeterChart;
