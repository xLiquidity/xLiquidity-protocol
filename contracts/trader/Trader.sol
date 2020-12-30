pragma solidity >=0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/SafeERC20.sol";

import "../../interfaces/IStrategy.sol"; 

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


    /// @dev determines the vault in which the trader contract can withdraw and deposit funds to 
    function setVault(address _token, address _vault) public onlyTrader {
        require(vaults[_token] == address(0), "vault"); // additional protection so we don't burn the funds
        vaults[_token] = _vault;
    }

    /// @dev determines the strategy in which the trader contract can withdraw and deposit funds to
    function setStrategy(address _token, address _strategy) public onlyTrader {
        strategies[_token] = _strategy;
    }

    function balanceOf(address _token) external view returns (uint256) {
        return IStrategy(strategies[_token]).balanceOf();
    }

    /** 
    @dev
    withdraws to the vault from the strategy
    must be called by the appropriate vault
    /*
    function withdraw(address _token, uint256 _amount) public view {
        require(msg.sender == vaults[_token], "!vault");
        IStrategy(strategies[_token]).withdraw(_amount);
    }
    
    /// @dev signals that a arbitrage strategy has started
    function arb(
        address _token,
        address _vault,
        uint256 _amount
    ) public onlyTrader {
        emit ArbInitiated(_token, _vault, _amount);
    }
}

