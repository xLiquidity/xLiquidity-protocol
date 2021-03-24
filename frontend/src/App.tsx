import React, { useContext, useEffect } from "react";
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "./components/hooks/state";
import Routes from "./components/Routes";
import Navigation from "./components/Navigation";
import {
  getAccount,
  updateAccount,
  loadProvider,
  loadBalance,
  loadTokenBalances,
} from "./interactions/interactions";
import { daiContractAddress } from "./config/config";
import "./App.css";
import { Symfoni, SignerContext } from "./hardhat/SymfoniContext";
import { Greeter } from "./components/Greeter";

function App() {
  const dispatch = useDispatch();
  const { account } = useSelector((st) => st.user);
  const [signer] = useContext(SignerContext);

  useEffect(() => {
    async function loadInitDetails() {
      getAccount(dispatch, window);
      updateAccount(dispatch, window);
      const provider = loadProvider(dispatch);
      loadBalance(dispatch, provider, account);
      loadTokenBalances(dispatch, provider, account);
      console.log(signer);
    }
    loadInitDetails();
  }, [dispatch, account, signer]);

  return (
    <div className="min-h-screen flex flex-col">
      <Symfoni autoInit={true}>
        <Navigation />
        <div className="relative flex-1 flex bg-white dark:bg-gray-900">
          <div className="flex flex-col w-0 flex-1">
            <main className="flex flex-col items-center flex-1 relative z-0 pb-6 focus:outline-none md:pb-6">
              <Routes />
            </main>
          </div>
        </div>
      </Symfoni>
    </div>
  );
}

export default App;
