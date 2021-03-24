import React from "react";
import Header from "./Header";
import VaultStrategyTable from "./VaultStrategyTable";

const VaultStrategies = ({ strategies }) => {
    return (
        <div className="flex-1 max-w-7xl w-full pb-12 px-4 sm:px-6 lg:px-8">
            <Header title={"Strategies"} />
            <div className="overflow-x-auto">
                <VaultStrategyTable strategies={strategies} />
            </div>
        </div>
    );
};

export default VaultStrategies;
