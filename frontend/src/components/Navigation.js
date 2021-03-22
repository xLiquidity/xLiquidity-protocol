import React from "react";
import { NavLink } from "react-router-dom";
import ConnectModal from "./ConnectModal";
import DarkModeToggle from "./DarkModeToggle";

const Navigation = () => {
  return (
    <div className="sticky top-0 z-10 flex-none">
      <nav className="dark:bg-gray-900 bg-gray-100 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto px-2 sm:px-4 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center px-2 lg:px-0 lg:space-x-2">
              <div className="flex-none">
                <NavLink
                  to="/"
                  className="rounded-md overflow-hidden flex h-9 w-9 focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition"
                >
                  <img
                    className="h-8 w-8"
                    src={process.env.PUBLIC_URL + "/assets/xLiquidity-logo.png"}
                    alt="xLiquidity"
                  />
                </NavLink>
              </div>
              <div className="flex">
                <div className="ml-10 flex space-x-4">
                  <NavLink
                    to="/dashboard"
                    activeClassName="text-gray-900 border border-green-300 hover:bg-gray-300 hover: dark:bg-gray-900 flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition dark:text-white dark:hover:bg-gray-700 text-sm leading-5 rounded-md px-3 py-2"
                    className="text-gray-900 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/vaults"
                    activeClassName="text-gray-900 border border-green-300 dark:bg-gray-900 flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition dark:text-white dark:hover:bg-gray-700 text-sm leading-5 rounded-md px-3 py-2"
                    className="text-gray-900 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Invest
                  </NavLink>
                  <NavLink
                    to="/manage"
                    activeClassName="text-gray-900 border border-green-300 dark:bg-gray-900 flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition dark:text-white dark:hover:bg-gray-700 text-sm leading-5 rounded-md px-3 py-2"
                    className="text-gray-900 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Manage
                  </NavLink>
                  <NavLink
                    to="/create"
                    activeClassName="text-gray-900 border border-green-300 dark:bg-gray-900 flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition dark:text-white dark:hover:bg-gray-700 text-sm leading-5 rounded-md px-3 py-2"
                    className="text-gray-900 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Create
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:ml-4">
              <div className="flex items-center">
                <ConnectModal />
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
