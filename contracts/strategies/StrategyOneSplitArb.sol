//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import "../interfaces/IController.sol";
import "../interfaces/IStrategy.sol";

/*
 A strategy must implement the following calls;
 
 - deposit()
 - withdraw(address) - Controller role - withdraw should return to Controller
 - withdraw(uint) - Controller | Vault role - withdraw should always return to vault
 - withdrawAll() - Controller | Vault role - withdraw should always return to vault
 - balanceOf()
 
 Where possible, strategies must remain as immutable as possible, instead of updating variables, we update the contract by linking it in the controller
 
*/

interface IOneSplit {
    function swap(
        IERC20 fromToken,
        IERC20 destToken,
        uint256 amount,
        uint256 minReturn,
        uint256[] memory distribution,
        uint256 flags
    ) external payable returns (uint256 returnAmount);

    function getExpectedReturn(
        address fromToken,
        address destToken,
        uint256 amount,
        uint256 parts,
        uint256 flags // See constants in IOneSplit.sol
        // uint256 destTokenEthPriceTimesGasPrice //This does not exist in current 1inch contract
    )
        external
        view
        returns (
            uint256 returnAmount,
            // uint256 estimateGasAmount,
            uint256[] memory distribution
        );
}

contract StrategyOneSplitArb {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;

    // the token the strategy is trying to accrue
    address want;

    // entities that can interact with the contract
    address public governance;
    address public controller;
    address public strategist;
    address ONE_SPLIT_ADDRESS = 0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E;

    // fees
    uint256 public withdrawalFee = 0;

    constructor(address _controller, address _want) {
        want = _want;
        governance = msg.sender;
        strategist = msg.sender;
        controller = _controller;
    }

    modifier isAuthorized() {
        require(msg.sender == governance || msg.sender == strategist || msg.sender == controller || msg.sender == address(this), "!authorized");
        _;
    }

    modifier onlyController() {
        require(msg.sender == controller, "!controller");
        _;
    }

    function getName() external pure returns (string memory) {
        return "StrategyOneSplitArb";
    }

    function execute(address intermediaryTokenAddress, uint256 _amount) public isAuthorized returns (uint256) {
        IOneSplit _oneSplitContract = IOneSplit(ONE_SPLIT_ADDRESS);

        (uint256 firstReturnAmount, uint256[] memory firstDistribution) = _oneSplitContract.getExpectedReturn(
            want, 
            intermediaryTokenAddress, 
            _amount, 
            3, 
            0
        );
        (uint256 returnAmount, uint256[] memory secondDistribution) = _oneSplitContract.getExpectedReturn(
            intermediaryTokenAddress,
            want,
            firstReturnAmount,
            3,
            0
        );

        require(returnAmount > _amount, "!prof");

        uint256 firstSwapOutput = _oneSplitContract.swap(
            IERC20(want),
            IERC20(intermediaryTokenAddress),
            _amount,
            firstReturnAmount,
            firstDistribution,
            0
        );
        uint256 secondSwapOutput = _oneSplitContract.swap(
            IERC20(intermediaryTokenAddress),
            IERC20(want),
            firstSwapOutput,
            returnAmount,
            secondDistribution,
            0
        );
        uint256 prof = secondSwapOutput.sub(_amount);
        return prof;
    }

    // Controller only function for creating additional rewards from dust
    function withdraw(IERC20 _asset) external isAuthorized returns (uint256 balance) {
        require(want != address(_asset), "want");
        balance = _asset.balanceOf(address(this));
        _asset.safeTransfer(controller, balance);
    }

    // Withdraw partial funds, normally used with a vault withdrawal
    function withdraw(uint256 _amount) external onlyController {
        internalWithdraw(_amount);
    }

    // // Withdraw all funds, normally used when migrating strategies
    function withdrawAll() external onlyController returns (uint256 balance) {
        balance = balanceOf();
        internalWithdraw(balance);
    }

        // Internal function for withdrawof funds funds
    function internalWithdraw(uint256 _amount) internal onlyController {
        uint256 _balance = balanceOf();
        require(_amount < _balance, "amount too large");

        address _vault = IController(controller).vaults(address(want));
        require(_vault != address(0), "!vault"); // additional protection so we don't burn the funds
        IERC20(want).safeTransfer(_vault, _amount);
    }

    function balanceOf() public view returns (uint256) {
        return IERC20(want).balanceOf(address(this));
    }

    function setGovernance(address _governance) external {
        require(msg.sender == governance, "!governance");
        governance = _governance;
    }

    function setController(address _controller) external {
        require(msg.sender == governance, "!governance");
        controller = _controller;
    }

    function setStrategist(address _strategist) external {
        require(msg.sender == governance || msg.sender == strategist, "!strategist");
        strategist = _strategist;
    }

    function setWithdrawalFee(uint256 _withdrawalFee) external {
        require(msg.sender == governance, "!governance");
        withdrawalFee = _withdrawalFee;
    }
}
