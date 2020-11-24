pragma solidity >=0.6.0;

interface ITrader {
  function withdraw(address, uint256) external;

  function balanceOf(address) external view returns (uint256);

  function vaults(address) external view returns (address);

  function strategies(address) external view returns (address);
}
