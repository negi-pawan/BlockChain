 var DappToken = artifacts.require("./DappToken.sol");

contract('DappToken', function(accounts) {

	it('allocate token name and symbol', function(){
		return DappToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name) {
			assert.equal(name, 'test token', 'Give the token name');
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, 'token', 'Set symbol for token');
		});
	});

  it('sets the total supply upon deployment with initial supply passed', function() {
    return DappToken.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000 using');
      return tokenInstance.balanceOf(accounts[0]);
    }).then(function(adminBalance){
    	assert.equal(adminBalance.toNumber(), 1000000, "Admin balance should be equals to the initial supply")
    });
  });


  it('transfer token', function() {
    return DappToken.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.transfer.call(accounts[1], 999999999999999);
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, error.message + 'error should have revert');
      return tokenInstance.transfer.call(accounts[1], 25000, {from: accounts[0]});
      }).then(function(success){
      	assert.equal(success, true, 'true for success');
      	return tokenInstance.transfer(accounts[1], 25000, {from: accounts[0]});
      }).then(function(receipt){
      	assert.equal(receipt.logs.length, 1, 'trigger a event');
      	assert.equal(receipt.logs[0].event, 'Transfer', 'It should be "Transfer event.');
      	assert.equal(receipt.logs[0].args._from, accounts[0], 'Token sender account');
      	assert.equal(receipt.logs[0].args._to, accounts[1], 'Token receipt account');
      	assert.equal(receipt.logs[0].args._value, 25000, 'Token transfered.');
      	return tokenInstance.balanceOf(accounts[1]);
      }).then(function(balance){
      	assert.equal(balance.toNumber(), 25000, "acount 1 recieved the amount");
      	return tokenInstance.balanceOf(accounts[0]);
      }).then(function(balance){
      	assert.equal(balance.toNumber(), 975000, "acount 0 sent the amount");
      	
      })
  });
});
