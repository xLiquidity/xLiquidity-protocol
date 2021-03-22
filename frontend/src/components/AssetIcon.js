import React from "react";

const AssetIcon = ({ icon }) => {
  return (
    <div className="AssetIcon">
      <img
        className="h-6 w-6"
        src={process.env.PUBLIC_URL + `/assets/${icon.toLowerCase()}`}
        alt={`${icon.toLowerCase()}`}
      />
    </div>
  );
};

export default AssetIcon;
