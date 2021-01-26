pragma solidity ^0.7.00;

import "@openzeppelinV2/contracts/token/ERC20/IERC20.sol";
import "@openzeppelinV2/contracts/math/SafeMath.sol";
import "@openzeppelinV2/contracts/utils/Address.sol";
import "@openzeppelinV2/contracts/token/ERC20/SafeERC20.sol";

import ".././interfaces/xliquidity-protocol/IController.sol";

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
    ) public payable returns (uint256 returnAmount);

    function getExpectedReturn(
        address fromToken,
        address destToken,
        uint256 amount,
        uint256 parts,
        uint256 flags, // See constants in IOneSplit.sol
        uint256 destTokenEthPriceTimesGasPrice
    )
        external
        view
        returns (
            uint256 returnAmount,
            uint256 estimateGasAmount,
            uint256[] memory distribution
        );
}

contract StrategyOneSplitArb {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;

    address public constant USDC_ADDRESS = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    address public constant want = address(USDC_ADDRESS);

    address public governance;
    address public controller;
    address public strategist;

    modifier isAuthorized() {
        require(msg.sender == governance || msg.sender == strategist || msg.sender == controller || msg.sender == address(this), "!authorized");
        _;
    }

    modifier onlyController() {
        require(msg.sender == controller, "!controller");
    }

    constructor(address _controller) public {
        governance = msg.sender;
        strategist = msg.sender;
        controller = _controller;
    }

    function getName() external pure returns (string memory) {
        return "StrategyOneSplitArb";
    }

    function execute(
        address fromTokenAddress,
        address intermediaryTokenAddress,
        uint256 _amount
    ) public isAuthorized returns (uint256 prof) {
        uint256(returnAmount, estimatedGasAmount, _) = getExpectedReturn(fromTokenAddress, intermediaryTokenAddress, _amount);
        require(returnAmount.sub(estimatedGasAmount > _amount), "!prof");

        uint256 firstSwapOutput = swap(fromTokenAddress, intermediaryTokenAddress, _amount);
        uint256 secondSwapOutput = swap(intermediaryTokenAddress, fromTokenAddress, _amount);
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
        uint256 _balance = balanceOf();
        require(_amount < balance, "amount too large");

        address _vault = IController(controller).vaults(address(want));
        require(_vault != address(0), "!vault"); // additional protection so we don't burn the funds
        IERC20(want).safeTransfer(_vault, _amount);
    }

    // Withdraw all funds, normally used when migrating strategies
    function withdrawAll() external onlyController returns (uint256 balance) {
        uint256 balance = balanceOf();
        withdraw(balance);
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
