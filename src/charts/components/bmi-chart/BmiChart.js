import React, {useEffect} from "react";
import GenericChart from "../generic-chart/GenericChart";
import DelayedRendering from "../../../common/components/delayed-rendering/DelayedRendering";
import Table from "../../../home/components/table/Table";

const BmiChart = ({getAverageBmiData, averageBmiData, getUserBmiHistory, userBmiHistory, tableTabSelected}) => {
    useEffect(() => {
        if (!averageBmiData) getAverageBmiData();

        getUserBmiHistory();
        // eslint-disable-next-line
    }, [])

    return (
        <DelayedRendering>
            {userBmiHistory && tableTabSelected && <Table data={userBmiHistory} title={"IMC"} accessor={"bmi"}/>}
            {averageBmiData && userBmiHistory && !tableTabSelected && <GenericChart percentileData={averageBmiData}
                                                                                    maxY={32}
                                                                                    minY={10}
                                                                                    yStep={2}
                                                                                    yLabel={"IMC"}
                                                                                    data={userBmiHistory}
                                                                                    zoomOptions={[{
                                                                                        min: 0,
                                                                                        max: 2
                                                                                    }, {min: 0, max: 6}, {
                                                                                        min: 0,
                                                                                        max: 19
                                                                                    }]}/>}
        </DelayedRendering>
    )
}

export default BmiChart;
