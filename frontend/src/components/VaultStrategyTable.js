import React from "react";
import VaultStrategyTableItem from "./VaultStrategyTableItem";

const VaultStrategyTable = ({ strategies }) => {
    return (
        <div className="my-8 space-y-7">
            <div className="shadow:lg dark:shadow-xl min-w-full rounded-lg border dark:border-gray-700 overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-100 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider dark:bg-gray-900 dark:text-white dark:border-gray-700">
                        <tr>
                            <th className="my-auto font-medium px-6 py-5 text-left">
                                <span className="inline-flex items-center">Name</span>
                            </th>
                            <th className="my-auto font-medium px-6 py-5 text-right">
                                <span className="inline-flex items-center">
                                    Description
                                </span>
                            </th>
                            <th className="my-auto font-medium px-6 py-5 text-right">
                                <span className="inline-flex items-center">
                                    Strategist
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="whitespace-nowrap text-sm leading-5 font-medium text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-300">
                        {strategies.map((strategy, idx) => (
                            <VaultStrategyTableItem item={strategy} key={idx} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VaultStrategyTable;
