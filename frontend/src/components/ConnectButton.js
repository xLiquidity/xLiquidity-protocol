import React from "react";
import AssetIcon from "./AssetIcon";

const ConnectButton = ({ name, icon, handleClick }) => {
    return (
        <button
            className="w-full shadow-md justify-between h-14 flex-shrink-0 inline-flex items-center overflow-hidden focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition text-md leading-5 rounded-md px-5 py-2 dark:text-white text:bg-gray-900 dark:active:bg-gray-500  border border-transparent hover:border hover:border-green-300 bg-gray-300 dark:bg-gray-700"
            onClick={handleClick}
            value={name}
        >
            <span className="">{name}</span>
            <AssetIcon icon={icon} />
        </button>
    );
};

export default ConnectButton;
