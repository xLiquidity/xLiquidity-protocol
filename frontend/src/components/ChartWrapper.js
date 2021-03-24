import React from "react";
import ChartHeader from "./ChartHeader";
import Chart from "./Chart";

const ChartWrapper = ({ data }) => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <ChartHeader />
            <Chart data={data} />
        </div>
    );
};

export default ChartWrapper;
