pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";

contract Vault is Initializable {
    address payable owner;

    function initialize(address payable _owner) initializer public {
        owner = _owner;
    }

    function withdraw() public {
        require(owner == msg.sender);
        owner.transfer(address(this).balance);
    }
}