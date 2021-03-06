import React from "react";
import Header from "./Header";

const Dashboard = () => {
    return (
        <div className="flex-1 max-w-7xl w-full pb-12 px-4 sm:px-6 lg:px-8">
            <Header title={`My Dashboard`} />
        </div>
    );
};

export default Dashboard;
