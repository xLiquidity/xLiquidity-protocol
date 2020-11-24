pragma solidity >=0.5.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

import "./Trader.sol";

contract Vault is ERC20 {
  /**
        - user deposits funds into vault
        - user get lp tokens representing their share of the vault
        - user can withdraw their funds from vault, effectively burning the lp token
        - if their aren't enough funds in the vault (if the funds are being used for arb),
             then we tell the trade bot to liquidate enough funds to be able to give the user their funds
    
     */

  using SafeERC20 for IERC20;
  using Address for address;
  using SafeMath for uint256;

  IERC20 public token;

  // arbitrary min and max
  uint256 public min = 9500;
  uint256 public max = 10000;

  address public owner;
  address public trader;

  modifier onlyOwner() {
    require(msg.sender == owner, "!owner");
    _;
  }

  constructor(address _token, address _trader)
    public
    /**
     * @dev creates the token associated with the vault (i.e.: if depositing dai, then xDAI)
     */
    ERC20(
      string(abi.encodePacked("xLiquidity ", ERC20(_token).name())),
      string(abi.encodePacked("x", ERC20(_token).symbol()))
    )
  {
    token = IERC20(_token);
    owner = msg.sender;
    trader = _trader;
  }

  function setOwner(address _owner) public onlyOwner {
    owner = _owner;
  }

  function setTrader(address _trader) public onlyOwner {
    trader = _trader;
  }

  function setMin(uint256 _min) external onlyOwner {
    min = _min;
  }

  // total desposit token balance in this contract
  function balance() public view returns (uint256) {
    return
      token.balanceOf(address(this)).add(
        ITrader(trader).balanceOf(address(token))
      );
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
    _amount = _after.sub(_before); // Additional check for deflationary tokens

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

      // withdraw from the trade contract when there aren't enough funds in this contract
      ITrader(trader).withdraw(address(token), _withdraw);

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

  // transfer available funds here to the trader contract for trading
  function trade() public onlyOwner {
    uint256 _bal = available();
    token.safeTransfer(trader, _bal);
    ITrader(trader).arb(address(token), _bal);
  }
}
