import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Card, Button } from "react-bootstrap";
import AssetIcon from "./AssetIcon";
import VaultAccordionFooter from "./VaultAccordionFooter";
import "./VaultAccordion.scss";

const VaultAccordion = ({
    symbol,
    icon,
    deposited,
    availableToDeposit,
    growth,
    totalAssets,
}) => {
    const [formData, setFormData] = useState({
        symbol: symbol,
        deposit: 0,
        withdraw: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((fData) => ({ ...fData, [name]: value }));
    };

    return (
        <div className="VaultAccordion">
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <div className="vault-columns">
                                <div className="vault-symbol-col">
                                    <AssetIcon icon={icon} />
                                    <div className="symbol">{symbol}</div>
                                </div>
                                <div>{deposited}</div>
                                <div>{growth}</div>
                                <div>{totalAssets}</div>
                                <div>{availableToDeposit}</div>
                                <div className="icon-col">
                                    <Link to={`/vaults/${symbol}`}>
                                        <AssetIcon icon={"trending-up-blue.svg"} />
                                    </Link>
                                    <AssetIcon icon={"chevron-down.svg"} />
                                </div>
                            </div>
                        </Accordion.Toggle>
                    </Card.Header>
                    <VaultAccordionFooter
                        symbol={symbol}
                        vaultBalance={deposited}
                        walletBalance={availableToDeposit}
                        depositAmount={formData.deposit}
                        withdrawAmount={formData.withdraw}
                        handleChange={handleChange}
                    />
                </Card>
            </Accordion>
        </div>
    );
};

export default VaultAccordion;
