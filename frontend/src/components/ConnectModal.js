import React, { useState } from "react";
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from "./hooks/state";
import { formatAddress } from "./helpers/address";
import ConnectButton from "./ConnectButton";
import Jazzicon from "react-jazzicon";
import { disconnectAccount } from "../actions/user";

const ConnectModal = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((st) => st.user);

  const [showModal, setShowModal] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = (e) => {
    const { ethereum } = window;

    setConnecting(true);
    ethereum.request({ method: "eth_requestAccounts" });
    setConnecting(false);
  };

  const handleDisconnect = (e) => {
    dispatch(disconnectAccount());
  };

  const connections = [{ name: "Metamask", icon: "metamask.png" }];

  const btnRender = (
    <>
      <button
        className="rounded-full items-center flex px-3 py-2 leading-5 text-sm font-medium border dark:text-white dark:border-gray-800 dark:bg-gray-700 bg-gray-200 cursor-pointer dark:hover:bg-gray-700  dark:hover:border-green-400 hover:border-green-400 focus:outline-none focus:text-white dark:focus:border-green-300 transition duration-150 ease-in-out"
        onClick={() => setShowModal(true)}
      >
        <span className="flex items-center">
          <span title={account || ""}>
            {account ? formatAddress(account) : "Connect Wallet"}
          </span>
        </span>
        {account && (
          <div className="rounded-full items-center inline-block relative ml-2">
            <Jazzicon
              className="rounded-full flex-shrink-0 h-5 w-5"
              diameter={20}
              seed={1}
            />
          </div>
        )}
      </button>
    </>
  );

  const render = (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={() => setShowModal(false)}
      >
        <div className="relative my-6 mx-auto max-w-3xl w-1/3">
          {/*content*/}
          <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-gray-900 bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex justify-between items-center pl-8 py-4 pr-6 border-b dark:border-gray-800">
              <div className="text-lg leading-6 font-medium dark:text-white">
                {account ? "Connected" : "Connect Wallet"}
              </div>
              <button
                className="dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition text-base leading-5"
                onClick={() => setShowModal(false)}
              >
                <img
                  src={process.env.PUBLIC_URL + `/assets/x-grey.svg`}
                  alt={`remove`}
                />
              </button>
            </div>

            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="my-4 text-gray-600 text-lg leading-relaxed">
                {!connecting ? (
                  <div className="connections">
                    {account && <p>{account}</p>}
                    {account && (
                      <button className="" onClick={handleDisconnect}>
                        Disconnect
                      </button>
                    )}
                    {!account &&
                      connections.map((conn, idx) => (
                        <ConnectButton
                          key={idx}
                          name={conn.name}
                          icon={conn.icon}
                          handleClick={handleConnect}
                        />
                      ))}
                  </div>
                ) : (
                  "connecting..."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*footer*/}
      <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  );

  return (
    <>
      {btnRender}
      {showModal && render}
    </>
  );
};

export default ConnectModal;
