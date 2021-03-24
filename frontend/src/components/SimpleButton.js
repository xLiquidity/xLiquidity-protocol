import React from "react";
import "./SimpleButton.scss";

const SimpleButton = ({ text, handleClick }) => {
    return (
        <div className="SimpleButton">
            <button onClick={handleClick}>{text}</button>
        </div>
    );
};

export default SimpleButton;
