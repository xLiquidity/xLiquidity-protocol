pragma solidity >=0.5.0;

interface IVault {
  function token() external view returns (address);

  function underlying() external view returns (address);

  function name() external view returns (string memory);

  function symbol() external view returns (string memory);

  function decimals() external view returns (uint8);

  function trader() external view returns (address);

  function getPricePerFullShare() external view returns (uint256);

  function deposit(uint256) external;

  function depositAll() external;

  function withdraw(uint256) external;

  function withdrawAll() external;
}
