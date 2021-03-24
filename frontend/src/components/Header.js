import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ title }) => {
    const { pathname } = useLocation();
    return (
        <header className="max-w-7xl w-full py-8">
            <div className="mt-4 flex flex-wrap justify-between items-center">
                <h1 className="text-gray-900 dark:text-white text-3xl font-bold mt-4">
                    {title}
                </h1>
                {pathname !== "/dashboard" ? (
                    <Link
                        to="/dashboard"
                        className="shadow-lg flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 text-lg leading-8 rounded-lg px-6 py-3 text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 border-transparent from-green-300 to-blue-400 mt-4 h-12"
                    >
                        Dashboard
                    </Link>
                ) : null}
            </div>
        </header>
    );
};

export default Header;
