pragma solidity >=0.5.0;

import "@openzeppelinV2/contracts/token/ERC20/IERC20.sol";
import "@openzeppelinV2/contracts/math/SafeMath.sol";
import "@openzeppelinV2/contracts/utils/Address.sol";
import "@openzeppelinV2/contracts/token/ERC20/SafeERC20.sol";

import "../../interfaces/IArb.sol";

contract Controller {
  address public controller;
  mapping(address => address) public vaults;
  mapping(address => address) public strategies;

  constructor() public {
    controller = msg.sender;
  }

  function setVault(address _token, address _vault) public {
    require(msg.sender == controller, "!controller");
    require(vaults[_token] == address(0), "vault");
    vaults[_token] = _vault;
  }

  function setStrategy(address _token, address _strategy) public {
    require(msg.sender == controller, "!controller");
    strategies[_strategy] = _strategy;
  }

  // withdraws to the strategy
  function withdraw(address _token, uint256 _amount) public {
    require(msg.sender == vaults[_token], "!vault");
    IArb(strategies[_token]).withdraw(_amount);
  }

  function arb(address _token, uint256 _amount) public {
    address _strategy = strategies[_token];
    address _want = IArb(_strategy).want();

    // arb
    IArb(_strategy).deposit();
  }
}
