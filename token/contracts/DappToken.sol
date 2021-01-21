pragma solidity ^0.5.16;

contract DappToken {
    // Constructor
    // Set the total number of tokens
    // Read the total number of tokens
    uint256 public totalSupply;
    string public name;
    string public symbol;

    mapping(address => uint256) public balanceOf;

    event Transfer(address _from, address _to, uint256 _value);

     constructor(uint256 _initialSupply) public {
     	name = "test token";
     	symbol = "token";
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns(bool success){
    	require(balanceOf[msg.sender] >= _value);
    	balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
    	balanceOf[_to] = balanceOf[_to] + _value;
    	emit Transfer(msg.sender, _to, _value);
    	return true;
    }
}
