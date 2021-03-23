//SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

interface IStrategy {
    // the native token
    function want() external view returns (address);

    // Deposits token (same as want() returns) into contract specified by the Strategy (might not need to use this if the strategy requires arb/trading methodology).
    function deposit() external;

    // dust collecting function that returns tokens to the vault if incorrectly sent to strategy; withdraw here should return to the Controller
    function withdraw(address) external;

    // partially withdraw funds denominated in want() token from the strategy to the appropriate vault; only controller should be able to call this
    function withdraw(uint256) external;

    // withdraw should return to the Vault; typically used when migrating/changing strategies
    function withdrawAll() external returns (uint256);

    // current want() balance in the strategy
    function balanceOf() external view returns (uint256);
}
