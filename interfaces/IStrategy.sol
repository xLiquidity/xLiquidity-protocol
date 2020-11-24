pragma solidity >=0.6.0;

interface IStrategy {
  function deposit() external;

  // withdraw should return to the Vault
  function withdraw(address, uint256) external;

  // withdraw should return to the Vault
  function withdrawAll() external returns (uint256);

  function balanceOf() external view returns (uint256);
}
