pragma solidity >=0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/SafeERC20.sol";
import "usingtellor/contracts/UsingTellor.sol";

import "../../interfaces/IStrategy.sol";

contract SampleUsingTellor is UsingTellor {

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function readTellorValue(uint256 _tellorID) external returns (uint256) {
    //Helper function to get latest available value for that Id
    (bool ifRetrieve, uint256 value, uint256 _timestampRetrieved) = getCurrentValue(_tellorID);
    if(!ifRetrieve) return 0;
    return value;
  }

  function readTellorValueBefore(uint256 _tellorId, uint256 _timestamp) external returns (uint256, uint256){
    //Helper Function to get a value before the given timestamp
    (bool _ifRetrieve, uint256 _value, uint256 _timestampRetrieved)  = getDataBefore(_tellorId, _timestamp);
    if(!_ifRetrieve) return (0,0);
    return (_value, _timestampRetrieved);
  }
}

contract Trader {
    event ArbInitiated(address indexed _token, address indexed _vault, uint256 _amount);

    address public trader;
    mapping(address => address) public vaults;
    mapping(address => address) public strategies;

    constructor() public {
        trader = msg.sender;
    }

    modifier onlyTrader() {
        require(msg.sender == trader, "!trader");
        _;
    }

    function setTrader(address _trader) public onlyTrader {
        trader = _trader;
    }

    function setVault(address _token, address _vault) public onlyTrader {
        require(vaults[_token] == address(0), "vault"); // additional protection so we don't burn the funds
        vaults[_token] = _vault;
    }

    function setStrategy(address _token, address _strategy) public onlyTrader {
        strategies[_token] = _strategy;
    }

    function balanceOf(address _token) external view returns (uint256) {
        return IStrategy(strategies[_token]).balanceOf();
    }

    // withdraws to the vault from the strategy
    // must be called by the appropriate vault
    function withdraw(address _token, uint256 _amount) public view {
        require(msg.sender == vaults[_token], "!vault");
        IStrategy(strategies[_token]).withdraw(_amount);
    }

    function arb(
        address _token,
        address _vault,
        uint256 _amount
    ) public onlyTrader {
        emit ArbInitiated(_token, _vault, _amount);
    }
}
