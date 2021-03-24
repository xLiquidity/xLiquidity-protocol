//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

interface IVault {
    function token() external view returns (address);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

    function controller() external view returns (address);

    function governance() external view returns (address);

    // native token balance (e.g.: DAI) (current balance in the vault, controller, and strategy contracts) divided by vault token (xlDAI) total supply
    function getPricePerFullShare() external view returns (uint256);

    // deposits into the vault
    function deposit(uint256) external;

    // deposits maximum amount of native token into the vault
    function depositAll() external;

    // withdraws native token from the vault
    function withdraw(uint256) external;

    // withdraws maximum amount of native token from the vault
    function withdrawAll() external;
}
