<<<<<<< HEAD
//SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/utils/Address.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/token/ERC20/SafeERC20.sol";

import "IController.sol";
import "IStrategy.sol";
=======
pragma solidity ^0.7.00;

import "@openzeppelinV2/contracts/token/ERC20/IERC20.sol";
import "@openzeppelinV2/contracts/math/SafeMath.sol";
import "@openzeppelinV2/contracts/utils/Address.sol";
import "@openzeppelinV2/contracts/token/ERC20/SafeERC20.sol";

import ".././interfaces/xliquidity-protocol/IController.sol";
>>>>>>> b7688d606f28727fd3eb126f65cb34bbbb665fa2

/*
 A strategy must implement the following calls;
 
 - deposit()
 - withdraw(address) - Controller role - withdraw should return to Controller
 - withdraw(uint) - Controller | Vault role - withdraw should always return to vault
 - withdrawAll() - Controller | Vault role - withdraw should always return to vault
 - balanceOf()
 
 Where possible, strategies must remain as immutable as possible, instead of updating variables, we update the contract by linking it in the controller
 
*/

<<<<<<< HEAD
// interface IOneSplit {
//     function swap(
//         IERC20 fromToken,
//         IERC20 destToken,
//         uint256 amount,
//         uint256 minReturn,
//         uint256[] memory distribution,
//         uint256 flags
//     ) public payable returns (uint256 returnAmount);

//     function getExpectedReturn(
//         address fromToken,
//         address destToken,
//         uint256 amount,
//         uint256 parts,
//         uint256 flags, // See constants in IOneSplit.sol
//         uint256 destTokenEthPriceTimesGasPrice
//     )
//         external
//         view
//         returns (
//             uint256 returnAmount,
//             uint256 estimateGasAmount,
//             uint256[] memory distribution
//         );
// }
=======
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
>>>>>>> b7688d606f28727fd3eb126f65cb34bbbb665fa2

contract StrategyOneSplitArb {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;

    // the token the strategy is trying to accrue
    address want;

<<<<<<< HEAD
    // entities that can interact with the contract
=======
>>>>>>> b7688d606f28727fd3eb126f65cb34bbbb665fa2
    address public governance;
    address public controller;
    address public strategist;

<<<<<<< HEAD
    // fees
    uint256 public withdrawalFee = 0;

    constructor(address _controller, address _want) {
=======
    constructor(address _controller, address _want) public {
>>>>>>> b7688d606f28727fd3eb126f65cb34bbbb665fa2
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
<<<<<<< HEAD
        _;
=======
>>>>>>> b7688d606f28727fd3eb126f65cb34bbbb665fa2
    }

    function getName() external pure returns (string memory) {
        return "StrategyOneSplitArb";
    }

<<<<<<< HEAD
    // function execute(address intermediaryTokenAddress, uint256 _amount) public isAuthorized returns (uint256 prof) {
    //     uint256(firstReturnAmount, firstEstimatedGasAmount, _) = getExpectedReturn(want, intermediaryTokenAddress, _amount);
    //     uint256(returnAmount, estimatedGasAmount, _) = getExpectedReturn(
    //         intermediaryTokenAddress,
    //         want,
    //         firstReturnAmount.sub(firstEstimatedGasAmount)
    //     );
    //     require(returnAmount.sub(estimatedGasAmount > _amount), "!prof");

    //     uint256 firstSwapOutput = swap(want, intermediaryTokenAddress, _amount);
    //     uint256 secondSwapOutput = swap(intermediaryTokenAddress, fromTokenAddress, _amount);
    //     uint256 prof = secondSwapOutput.sub(_amount);
    //     return prof;
    // }
=======
    function execute(address intermediaryTokenAddress, uint256 _amount) public isAuthorized returns (uint256 prof) {
        uint256(firstReturnAmount, firstEstimatedGasAmount, _) = getExpectedReturn(want, intermediaryTokenAddress, _amount);
        uint256(returnAmount, estimatedGasAmount, _) = getExpectedReturn(
            intermediaryTokenAddress,
            want,
            firstReturnAmount.sub(firstEstimatedGasAmount)
        );
        require(returnAmount.sub(estimatedGasAmount) > _amount, "!prof");

        uint256 firstSwapOutput = swap(want, intermediaryTokenAddress, _amount);
        uint256 secondSwapOutput = swap(intermediaryTokenAddress, fromTokenAddress, _amount);
        uint256 prof = secondSwapOutput.sub(_amount);
        return prof;
    }
>>>>>>> b7688d606f28727fd3eb126f65cb34bbbb665fa2

    // Controller only function for creating additional rewards from dust
    function withdraw(IERC20 _asset) external isAuthorized returns (uint256 balance) {
        require(want != address(_asset), "want");
        balance = _asset.balanceOf(address(this));
        _asset.safeTransfer(controller, balance);
    }

    // Withdraw partial funds, normally used with a vault withdrawal
    function withdraw(uint256 _amount) external onlyController {
        uint256 _balance = balanceOf();
<<<<<<< HEAD
        require(_amount < _balance, "amount too large");
=======
        require(_amount < balance, "amount too large");
>>>>>>> b7688d606f28727fd3eb126f65cb34bbbb665fa2

        address _vault = IController(controller).vaults(address(want));
        require(_vault != address(0), "!vault"); // additional protection so we don't burn the funds
        IERC20(want).safeTransfer(_vault, _amount);
    }

<<<<<<< HEAD
    // // Withdraw all funds, normally used when migrating strategies
    // function withdrawAll() external onlyController returns (uint256 balance) {
    //     balance = balanceOf();
    //     withdraw(balance);
    // }
=======
    // Withdraw all funds, normally used when migrating strategies
    function withdrawAll() external onlyController returns (uint256 balance) {
        uint256 balance = balanceOf();
        withdraw(balance);
    }
>>>>>>> b7688d606f28727fd3eb126f65cb34bbbb665fa2

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
<<<<<<< HEAD
}
=======
}
>>>>>>> b7688d606f28727fd3eb126f65cb34bbbb665fa2
