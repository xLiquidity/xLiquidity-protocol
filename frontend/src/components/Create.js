import React from "react";
import CreateForm from "./CreateForm";
import Header from "./Header";

const Create = () => {
    return (
        <div className="flex-1 max-w-7xl w-full pb-12 px-4 sm:px-6 lg:px-8">
            <Header title={`Create`} />
            <CreateForm />
        </div>
    );
};

export default Create;
