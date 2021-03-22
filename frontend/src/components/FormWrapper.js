import React from "react";

const FormWrapper = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-auto">
                <div className="items-center p-10 rounded-lg flex flex-col dark:bg-gray-800 border dark:border-gray-700">
                    <h2 className="text-2xl dark:text-gray-50 leading-8 font-semibold">
                        Create
                    </h2>
                    <p className="my-6 text-base font-normal leading-8 dark:text-gray-400">
                        Create a strategy or a vault
                    </p>
                    <button className="w-full flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-700 focus-visible:ring-offset-gray-800 transition text-lg leading-8 rounded-lg py-3 text-white bg-green-500 dark:active:bg-green-500 dark:hover:bg-green-400 border border-transparent mt-2 self-center">
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormWrapper;
