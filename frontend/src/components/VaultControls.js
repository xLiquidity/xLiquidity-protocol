import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import SimpleButton from "./SimpleButton";
import "./VaultControls.scss";

const VaultControls = ({ type, balance, formInput, handleSubmit, handleChange }) => {
    return (
        <div className="VaultControls">
            <div className="input-header">
                Available to {type}: {balance || 0.0}
            </div>
            <div className="input-wrapper">
                <InputGroup className="form-input mr-2">
                    <FormControl
                        name={type}
                        value={formInput}
                        placeholder={formInput}
                        aria-label={`${type}`}
                        aria-describedby={`${type}`}
                        onChange={handleChange}
                    />
                </InputGroup>
                <SimpleButton text={type} handleClick={handleSubmit} />
            </div>
        </div>
    );
};

export default VaultControls;
