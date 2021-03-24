import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { strategies } from "./data/sampleData";
import Header from "./Header";

const VaultStrategyDetails = () => {
  const { name } = useParams();
  const [strategy, setStrategy] = useState({
    name: name,
    description: "",
    strategist: "",
  });

  useEffect(() => {
    function getStrategy() {
      const strategy =
        strategies && strategies.filter((strat) => strat.name === name);
      return strategy;
    }

    const strategy = getStrategy();
    setStrategy(strategy);
  }, [name]);

  return (
    <div className="flex-1 max-w-7xl w-full pb-12 px-4 sm:px-6 lg:px-8">
      <Header title={`Vault Strategy: ${name}`} />
      <div className="overflow-x-auto">{`${
        strategy.description || ""
      } created by ${strategy.strategist || ""}`}</div>
    </div>
  );
};

export default VaultStrategyDetails;
