import React from "react";
import { vaults } from "./data/sampleData";
import Header from "./Header";
import VaultTable from "./VaultTable";

const Vaults = () => {
    return (
        <div className="flex-1 max-w-7xl w-full pb-12 px-4 sm:px-6 lg:px-8">
            <Header title={"Vaults"} />
            <div className="overflow-x-auto">
                <VaultTable vaults={vaults} />
            </div>
        </div>
    );
};

export default Vaults;
