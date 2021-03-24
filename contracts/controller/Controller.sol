//SPDX-License-Identifier: MIT
<<<<<<< HEAD
pragma solidity ^0.7.3;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/utils/Address.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/token/ERC20/SafeERC20.sol";

import "IStrategy.sol";
=======
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import "./interfaces/IStrategy.sol";
>>>>>>> b7688d606f28727fd3eb126f65cb34bbbb665fa2

contract Controller {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;

    address public governance;
    address public strategist;

    mapping(address => address) public vaults;
    mapping(address => address) public strategies;

    constructor() {
        governance = msg.sender;
        strategist = msg.sender;
    }

    modifier onlyGovernance {
        require(msg.sender == governance, "!governance");
        _;
    }

    function setStrategist(address _strategist) public onlyGovernance {
        strategist = _strategist;
    }

    function setGovernance(address _governance) public onlyGovernance {
        governance = _governance;
    }

    /// @dev determines the vault in which the Strategy contract can withdraw and deposit funds to
    function setVault(address _token, address _vault) public {
        require(msg.sender == strategist || msg.sender == governance, "!governance");
        require(vaults[_token] == address(0), "vault"); // additional protection so we don't burn the funds
        vaults[_token] = _vault;
    }

    /// @dev determines the strategy in which the trader contract can withdraw and deposit funds to
    function setStrategy(address _token, address _strategy) public {
        require(msg.sender == strategist || msg.sender == governance, "!strategist");
        address _currStrategy = strategies[_token];

        if (_currStrategy != address(0)) {
            IStrategy(_currStrategy).withdrawAll();
        }

        strategies[_token] = _strategy;
    }

    function transferToStrategy(address _token, uint256 _amount) public {
        address _currStrategy = strategies[_token];
<<<<<<< HEAD
        // address _want = IStrategy(_currStrategy).want(); - This is for some functionality not currently in this protocol
=======
        address _want = IStrategy(_currStrategy).want();

>>>>>>> b7688d606f28727fd3eb126f65cb34bbbb665fa2
        // if the _token is not _want, then we should probably convert the token to want

        IERC20(_token).safeTransfer(_currStrategy, _amount);
    }

    function balanceOf(address _token) external view returns (uint256) {
        return IStrategy(strategies[_token]).balanceOf();
    }

    /** 
    @dev
    withdraws to the vault from the strategy
    must be called by the appropriate vault
    */
    function withdraw(address _token, uint256 _amount) public {
        require(msg.sender == vaults[_token], "!vault");
        IStrategy(strategies[_token]).withdraw(_amount);
    }

    function withdrawAll(address _token) public {
        require(msg.sender == strategist || msg.sender == governance, "!strategist");
        IStrategy(strategies[_token]).withdrawAll();
    }
}
