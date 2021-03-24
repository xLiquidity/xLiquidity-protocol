import React from "react";

const ChartHeader = () => {
    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center xl:items-end md:justify-between">
            <div className="flex flex-col">
                <span className="mb-2 text-sm text-center md:text-left leading-5 font-normal dark:text-gray-400">
                    Vault Price
                </span>
                <div className="flex flex-wrap justify-center md:justify-left items-baseline">
                    <span className="text-4xl md:text-5xl dark:text-white text-gray-900 font-semibold">
                        <span className="flex-wrap md:flex-nowrap whitespace-nowrap dark:text-white truncate">
                            Some Price
                        </span>
                    </span>
                    <span className="pl-4 text-green-400">
                        <span className="flex-wrap md:flex-nowrap whitespace-nowrap truncate dark:text-green-400 text-green-400">
                            %Change
                        </span>
                    </span>
                    <span className="px-4 dark:text-gray-200 text-gray-400 whitespace-nowrap">
                        Past 1D
                    </span>
                </div>
            </div>
            <span className="flex flex-col-reverse xl:flex-row md:ml-6 items-center md:items-center">
                <nav className="px-px flex flex-nowrap overflow-x-auto">
                    Timeframe Select
                </nav>
            </span>
        </div>
    );
};

export default ChartHeader;
