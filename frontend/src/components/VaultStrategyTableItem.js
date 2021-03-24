import React from "react";
import { useHistory } from "react-router-dom";

const VaultStrategyTableItem = ({ item }) => {
    const { vaultSymbol, name, description, strategist } = item;
    const history = useHistory();
    const handleRowClick = (row) => {
        history.push(`/vaults/${vaultSymbol}/strategy/${name}`);
    };

    return (
        <tr
            onClick={handleRowClick}
            className="leading-5 hover:bg-gray-100 items-center border-t border-gray-200 dark:border-gray-700 cursor-pointer group dark:hover:bg-gray-900 dark:hover:shadow-lg"
        >
            <td className="px-6 py-5 text-left">
                <div className="flex items-center">
                    <span className="ml-3 text-sm uppercase leading-5 font-medium text-gray-900 dark:text-white truncate">
                        {name}
                    </span>
                </div>
            </td>
            <td className="px-6 py-5 text-right">
                <span className="ml-3 text-sm leading-5 font-medium text-gray-900 dark:text-white truncate">
                    <span>{description}</span>
                </span>
            </td>
            <td className="px-6 py-5 text-right">
                <span className="ml-3 text-sm leading-5 font-medium text-gray-900 dark:text-white truncate">
                    <span>{strategist}</span>
                </span>
            </td>
        </tr>
    );
};

export default VaultStrategyTableItem;
