import React from "react";
import { useAppDispatch as useDispatch } from "./hooks/state";
import { Accordion, Card } from "react-bootstrap";
import VaultControls from "./VaultControls";
import {
  depositInitiatedInState,
  withdrawInitiatedInState,
} from "../actions/user";
import "./VaultAccordionFooter.scss";

const VaultAccordionFooter = ({
  symbol,
  vaultBalance,
  walletBalance,
  depositAmount,
  withdrawAmount,
  handleChange,
}) => {
  const dispatch = useDispatch();
  const handleDeposit = () => {
    dispatch(depositInitiatedInState(symbol, depositAmount));
  };
  const handleWithdraw = () => {
    dispatch(withdrawInitiatedInState(symbol, withdrawAmount));
  };

  return (
    <div className="VaultAccordionFooter">
      <Accordion.Collapse eventKey="0">
        <div className="body-wrapper">
          <Card.Body>
            <VaultControls
              type="deposit"
              balance={walletBalance}
              formInput={depositAmount}
              handleSubmit={handleDeposit}
              handleChange={handleChange}
            />
            <VaultControls
              type="withdraw"
              balance={vaultBalance}
              formInput={withdrawAmount}
              handleSubmit={handleWithdraw}
              handleChange={handleChange}
            />
          </Card.Body>
        </div>
      </Accordion.Collapse>
    </div>
  );
};

export default VaultAccordionFooter;
