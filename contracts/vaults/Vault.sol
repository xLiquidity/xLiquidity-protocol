//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "usingtellor/contracts/UsingTellor.sol";

import "IVault.sol";
import "IController.sol";

import "hardhat/console.sol";

contract Vault is ERC20,UsingTellor {
    /**
        - user deposits funds into vault
        - user get lp tokens representing their share of the vault
        - user can withdraw their funds from vault, effectively burning the lp token
        - if there aren't enough funds in the vault (if the funds are being used for strategy execution),
             then signal the strategy (via Controller) to liquidate enough funds to be able to give the user their funds
    
     */

    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;

    IERC20 public token;

    // arbitrary min and max
    uint256 public min = 9500;
    uint256 public max = 10000;

    address public owner;
    address public controller; //change from trader to controller

    constructor(address _token, address _controller, address _tellorAddress)
        /**
         * @dev creates the token associated with the vault (e.g., if depositing DAI, then xDAI)
         */
        ERC20(string(abi.encodePacked("xLiquidity ", ERC20(_token).name())), string(abi.encodePacked("xl", ERC20(_token).symbol())))
    {
        _setupDecimals(ERC20(_token).decimals());
        token = IERC20(_token);
        owner = msg.sender;
        controller = _controller;
        UsingTellor(_tellorAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "!owner");
        _;
    }
    
    // oracle shows current price data to vault
    function getCurrentValue(uint256 _requestId) public view returns (bool ifRetrieve,
    uint256 value, uint256 _timestampRetrieved) {
        return getDataBefore(_requestId);
    }

    // provides the balance of assets available in the vault and in the controller
    function balance() public view returns (uint256) {
        return token.balanceOf(address(this)).add(IController(controller).balanceOf(address(token)));
    }

    // sets the minimum amount needed
    function setMin(uint256 _min) external onlyOwner {
        require(_min <= max, "numerator cannot be greater than denominator");
        min = _min;
    }

    function setController(address _controller) public onlyOwner {
        controller = _controller;
    }

    // amount in the vault available to be borrowed
    // custom logic goes here; can manipulate the min amount
    function available() public view returns (uint256) {
        return token.balanceOf(address(this)).mul(min).div(max);
    }

    function deposit(uint256 _amount) public {
        uint256 _pool = balance();
        uint256 _before = token.balanceOf(address(this));

        // transfer amount from user to this contract
        token.safeTransferFrom(msg.sender, address(this), _amount);

        uint256 _after = token.balanceOf(address(this));
        require(_amount == _after.sub(_before)); // Additional check for deflationary tokens - turned this into a require statement

        uint256 shares = 0;

        if (totalSupply() == 0) {
            shares = _amount;
        } else {
            shares = (_amount.mul(totalSupply())).div(_pool);
        }
        _mint(msg.sender, shares);
    }

    function depositAll() external {
        deposit(token.balanceOf(msg.sender));
    }

    function withdraw(uint256 _shares) public {
        uint256 r = (balance().mul(_shares)).div(totalSupply());
        _burn(msg.sender, _shares);

        // check total balance of this contract in deposit token
        uint256 b = token.balanceOf(address(this));

        if (b < r) {
            uint256 _withdraw = r.sub(b);

            // withdraw from the strategy when there aren't enough funds in this contract
            IController(controller).withdraw(address(token), _withdraw);

            uint256 _after = token.balanceOf(address(this));
            uint256 _diff = _after.sub(b);

            if (_diff < _withdraw) {
                r = b.add(_diff);
            }
        }

        token.safeTransfer(msg.sender, r);
    }

    function withdrawAll() external {
        withdraw(balanceOf(msg.sender));
    }

    function getPricePerFullShare() public view returns (uint256) {
        return balance().mul(1e18).div(totalSupply());
    }

    // transfers funds here to the controller, who then transfers to the strategy
    function transferToStrategy() public {
        uint256 _bal = available();
        token.safeTransfer(controller, _bal);
        IController(controller).transferToStrategy(address(token), _bal);
    }
}
