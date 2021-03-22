import React from "react";
import { useHistory } from "react-router-dom";
import AssetIcon from "./AssetIcon";

const VaultTableItem = ({ item }) => {
    const { symbol, icon, deposited, availableToDeposit, growth, aum } = item;
    const history = useHistory();
    const handleRowClick = (row) => {
        history.push(`/vaults/${symbol}`);
    };

    return (
        <tr
            onClick={handleRowClick}
            className="leading-5 hover:bg-gray-100 items-center border-t border-gray-200 dark:border-gray-700 cursor-pointer group dark:hover:bg-gray-900 dark:hover:shadow-lg"
        >
            <td className="px-6 py-5 text-left">
                <div className="flex items-center">
                    <AssetIcon icon={icon} />
                    <span className="ml-3 text-sm uppercase leading-5 font-medium text-gray-900 dark:text-white truncate">
                        {symbol}
                    </span>
                </div>
            </td>
            <td className="px-6 py-5 text-right">
                <span className="ml-3 text-sm leading-5 font-medium text-gray-900 dark:text-white truncate">
                    <span>{deposited}</span>
                </span>
            </td>
            <td className="px-6 py-5 text-right">
                <span className="ml-3 text-sm leading-5 font-medium text-gray-900 dark:text-white truncate">
                    <span>{availableToDeposit}</span>
                </span>
            </td>
            <td className="px-6 py-5 text-right">
                <span className="ml-3 text-sm leading-5 font-medium text-gray-900 dark:text-white truncate">
                    <span>{growth}</span>
                </span>
            </td>
            <td className="px-6 py-5 text-right">
                <span className="ml-3 text-sm leading-5 font-medium text-gray-900 dark:text-white truncate">
                    <span>{aum}</span>
                </span>
            </td>
        </tr>
    );
};

export default VaultTableItem;
