import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";
import HomeTable from "../../../home/components/table/HomeTable";

const HeightChart = ({
                         getAverageHeightData,
                         averageHeightData,
                         getUserHeightHistory,
                         userHeightHistory,
                         tableTabSelected
                     }) => {
    useEffect(() => {
        if (!averageHeightData) getAverageHeightData();

        getUserHeightHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {userHeightHistory && tableTabSelected &&
            <HomeTable data={userHeightHistory} title={"Estatura"} accessor={"height"}/>}
            {averageHeightData && userHeightHistory && !tableTabSelected &&
            <GenericChart percentileData={averageHeightData}
                          maxY={190}
                          minY={40}
                          yStep={10}
                          yLabel={"Estatura (cm)"}
                          data={userHeightHistory} zoomOptions={[{min: 0, max: 2}, {min: 0, max: 6}, {min: 0, max: 19}]}
            />}
        </DelayedRendering>
    )
}

export default HeightChart;
