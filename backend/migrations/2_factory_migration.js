const Token = artifacts.require("SupplyChain");

module.exports = function(deployer) {
  // Deploy Token contract with constructor arguments
  deployer.deploy(Token);
};
