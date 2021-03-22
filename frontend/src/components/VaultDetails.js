import React from "react";
import { useParams } from "react-router";
import { vaultPriceData, strategies } from "./data/sampleData";
import ChartWrapper from "./ChartWrapper";
import Header from "./Header";
import VaultStrategyTable from "./VaultStrategyTable";

const VaultDetails = () => {
    const { symbol } = useParams();
    const filteredStrategies =
        strategies && strategies.filter((strat) => strat.vaultSymbol === symbol);
    return (
        <div className="flex-1 max-w-7xl w-full pb-12 px-4 sm:px-6 lg:px-8">
            <Header title={`Vault: ${symbol.toUpperCase()}`} />
            <div className="overflow-x-auto">
                <ChartWrapper data={vaultPriceData} />
            </div>
            <div className="flex-col">
                <span className="mb-5 mt-10 text-l leading-5 dark:text-cool-gray-200 flex whitespace-nowrap">
                    Strategies
                </span>
            </div>
            <VaultStrategyTable strategies={filteredStrategies} />
        </div>
    );
};

export default VaultDetails;
