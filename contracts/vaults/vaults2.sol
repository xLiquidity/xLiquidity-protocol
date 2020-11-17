pragma solidity ^0.5.0;


contract Vault1 {
  bool public locked; //* replace with interger value
  bytes32 private password;

  function Vault1(bytes32 _password) public {
    locked = true;
    password = _password;
  }

//* send and receive tBTC

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}

contract Vault2 {
  bool public locked; //* replace with interger value
  bytes32 private password;

  function Vault2(bytes32 _password) public {
    locked = true;
    password = _password;
  }
  
  //* send and receive ether

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}

contract Vault3 {
  bool public locked; //* replace with interger value
  bytes32 private password;

  function Vault3(bytes32 _password) public {
    locked = true;
    password = _password;
  }
  
  //* send and receive Dai

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}

