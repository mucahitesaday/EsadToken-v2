const EsadToken2 = artifacts.require("./EsadToken2");
const EsadToken2Sale = artifacts.require("./EsadToken2Sale");



module.exports = function (deployer) {
  deployer.deploy(EsadToken2).then(() =>{
    deployer.deploy(EsadToken2Sale, "0x77cF7701cE69C75f15DB4FFa9407e2B1B706E0A2");
  });
};

