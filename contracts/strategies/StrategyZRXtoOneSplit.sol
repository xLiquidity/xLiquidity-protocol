pragma solidity >=0.5.0;

import "@openzeppelinV2/contracts/token/ERC20/IERC20.sol";
import "@openzeppelinV2/contracts/math/SafeMath.sol";
import "@openzeppelinV2/contracts/utils/Address.sol";
import "@openzeppelinV2/contracts/token/ERC20/SafeERC20.sol";
import "@1inchProtocol/contracts/IOneSplit.sol";

import "../../interfaces/IController.sol";

contract StrategyZRXtoOneSplit {
    address payable owner;
    address payable controller;

    // OneSplit Config; oneinch exchange
    address ONE_SPLIT_ADDRESS = 0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E;
    uint256 PARTS = 10;
    uint256 FLAGS = 0;

    // ZRX Config
    address ZRX_EXCHANGE_ADDRESS = 0x61935CbDd02287B511119DDb11Aeb42F1593b7Ef;
    address ZRX_ERC20_PROXY_ADDRESS = 0x95E6F48254609A6ee006F7D493c8e5fB97094ceF;
    address ZRX_STAKING_PROXY = 0xa26e80e7Dea86279c6d778D702Cc413E6CFfA777; // Fee collector

    // Modifiers
    modifier onlyController() {
        require(msg.sender == controller, "!controller");
        _;
    }

    constructor(address _controller) public payable {
        controller = _controller;
    }

    function arb(
        address _fromToken,
        address _toToken,
        uint256 _fromAmount,
        bytes memory _0xData,
        uint256 _1SplitMinReturn,
        uint256[] memory _1SplitDistribution
    ) public payable onlyOwner {
        _arb(_fromToken, _toToken, _fromAmount, _0xData, _1SplitMinReturn, _1SplitDistribution);
    }

    function _arb(
        address _fromToken,
        address _toToken,
        uint256 _fromAmount,
        bytes memory _0xData,
        uint256 _1SplitMinReturn,
        uint256[] memory _1SplitDistribution
    ) internal {
        // Track original balance
        uint256 _startBalance = IERC20(_fromToken).balanceOf(address(this));

        // Perform the arb trade
        _trade(_fromToken, _toToken, _fromAmount, _0xData, _1SplitMinReturn, _1SplitDistribution);

        // Track result balance
        uint256 _endBalance = IERC20(_fromToken).balanceOf(address(this));

        // Require that arbitrage is profitable
        require(_endBalance > _startBalance, "End balance must exceed start balance.");
    }

    function trade(
        address _fromToken,
        address _toToken,
        uint256 _fromAmount,
        bytes memory _0xData,
        uint256 _1SplitMinReturn,
        uint256[] memory _1SplitDistribution
    ) public payable onlyController {
        _trade(_fromToken, _toToken, _fromAmount, _0xData, _1SplitMinReturn, _1SplitDistribution);
    }

    function _trade(
        address _fromToken,
        address _toToken,
        uint256 _fromAmount,
        bytes memory _0xData,
        uint256 _1SplitMinReturn,
        uint256[] memory _1SplitDistribution
    ) internal {
        // Track the balance of the token RECEIVED from the trade
        uint256 _beforeBalance = IERC20(_toToken).balanceOf(address(this));

        // Swap on 0x: give _fromToken, receive _toToken
        _zrxSwap(_fromToken, _fromAmount, _0xData);

        // Calculate the how much of the token we received
        uint256 _afterBalance = IERC20(_toToken).balanceOf(address(this));

        // Read _toToken balance after swap
        uint256 _toAmount = _afterBalance.sub(_beforeBalance);

        // Swap on 1Split: give _toToken, receive _fromToken
        _oneSplitSwap(_toToken, _fromToken, _toAmount, _1SplitMinReturn, _1SplitDistribution);
    }

    function zrxSwap(
        address _from,
        uint256 _amount,
        bytes memory _calldataHexString
    ) public payable onlyController {
        _zrxSwap(_from, _amount, _calldataHexString);
    }

    function _zrxSwap(
        address _from,
        uint256 _amount,
        bytes memory _calldataHexString
    ) internal {
        // Approve tokens
        IERC20 _fromIERC20 = IERC20(_from);
        _fromIERC20.approve(ZRX_ERC20_PROXY_ADDRESS, _amount);

        // Swap tokens
        address(ZRX_EXCHANGE_ADDRESS).call.value(msg.value)(_calldataHexString);

        // Reset approval
        _fromIERC20.approve(ZRX_ERC20_PROXY_ADDRESS, 0);
    }

    function oneSplitSwap(
        address _from,
        address _to,
        uint256 _amount,
        uint256 _minReturn,
        uint256[] memory _distribution
    ) public payable onlyController {
        _oneSplitSwap(_from, _to, _amount, _minReturn, _distribution);
    }

    function _oneSplitSwap(
        address _from,
        address _to,
        uint256 _amount,
        uint256 _minReturn,
        uint256[] memory _distribution
    ) internal {
        // Setup contracts
        IERC20 _fromIERC20 = IERC20(_from);
        IERC20 _toIERC20 = IERC20(_to);
        IOneSplit _oneSplitContract = IOneSplit(ONE_SPLIT_ADDRESS);

        // Approve tokens
        _fromIERC20.approve(ONE_SPLIT_ADDRESS, _amount);

        // Swap tokens: give _from, get _to
        _oneSplitContract.swap(_fromIERC20, _toIERC20, _amount, _minReturn, _distribution, FLAGS);

        // Reset approval
        _fromIERC20.approve(ONE_SPLIT_ADDRESS, 0);
    }

    // Withdraw partial funds, normally used with a vault withdrawal
    function withdraw(
        address _tokenAddress,
        address _vault,
        uint256 _amount
    ) public onlyController {
        uint256 _balance = IERC20(_tokenAddress).balanceOf(address(this));

        address _vault = IController(controller).vaults(address(_tokenAddress));
        require(_vault != address(0), "!vault"); // additional protection so we don't burn the funds
        IERC20(_tokenAddress).safeTransfer(_vault, _amount);
    }

    // withdraws tokens to the Vault
    function withdrawAll(address _tokenAddress, address _vault) public onlyController {
        uint256 balance = IERC20(_tokenAddress).balanceOf(address(this));
        IERC20(_tokenAddress).safeTranser(_vault, balance);
    }

    function withdrawEther() public onlyController {
        address self = address(this); // workaround for a possible solidity bug
        uint256 balance = self.balance;
        address(OWNER).transfer(balance);
    }
}
