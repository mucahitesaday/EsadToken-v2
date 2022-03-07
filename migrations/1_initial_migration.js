const EsadToken2 = artifacts.require("./EsadToken2");
const EsadToken2Sale = artifacts.require("./EsadToken2Sale");



module.exports = function (deployer) {
  deployer.deploy(EsadToken2).then(() =>{
    deployer.deploy(EsadToken2Sale, EsadToken2.address);
  });
}; 
