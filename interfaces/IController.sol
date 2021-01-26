pragma solidity >=0.6.0;

interface IController {
    // calls Strategy.withdraw() function of the Strategy contract; address is the Strategy contract address; Vault should be its only allowed caller
    function withdraw(address, uint256) external;

    // returns the balance of the Strategy associated with the address
    function balanceOf(address) external view returns (uint256);

    // transfers from the vault to the appropriate strategy
    function transferToStrategy(address, uint256) external;

    // takes a token address and returns the corresponding vault address
    function vaults(address) external view returns (address);

    // takes a token address and returns the associated strategy address
    function strategies(address) external view returns (address);
}
