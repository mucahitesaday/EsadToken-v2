import Web3 from 'web3'
import FacuToken from '../build/contracts/FacuToken.json';
import FacuTokenSale from '../build/contracts/FacuTokenSale.json';
const contract = require('@truffle/contract');

// func degisken tanımlamaları
export const load = async() => {
    await loadWeb3();
    const account = await loadAccount();
    const { contractFT, contractFTS } = await loadContracts();
    const { ethFunds, transactionCount, tokensSold, ethPriceN, transactions } = await loadVariables(contractFTS);
    const bal = await contractFT.balanceOf(account);
    const myET = bal / 10**18;
    return { uyelik, contractETS, contractET, ethFunds, transactionCount, tokensSatis, ethPriceN, transactions, myET };
};

// Ön yüze aktarılacak bilgilerin çekileceği kısım !!

const loadVariables = async (contractFTS) => {
    const admin = "0x77cF7701cE69C75f15DB4FFa9407e2B1B706E0A2";
    const ethFunds = await window.web3.eth.getBalance(admin);

    const tCount = await contractFTS.transactionCount();
    const transactionCount = tCount.toNumber();

    const tSold = await contractFTS.tokensSold();
    const tokensSold = window.web3.utils.fromWei(tSold, 'ether');

    const ethPrice = await contractFTS.getETHPrice();
    const ethPriceN = ethPrice.toNumber();

    // son 10 transfer alınması için yapılan döngü
    const transactions = [];
    var j = 0;
    for (var i = transactionCount - 1; i >= 0 && j < 10; i--) {
        const t = await contractFTS.transaction(i);
        j++;
        transactions.push(t);
    }

    return { ethFunds, transactionCount, tokensSold, ethPriceN, transactions };
};


// kontratı yükleme
const loadContracts = async () => {
    const ETContract = contract(EsadToken2);
    ETContract.setProvider(window.web3.currentProvider);
    const ETSContract = contract(EsadToken2Sale);
    ETSContract.setProvider(window.web3.currentProvider);

    const contractET = await ETContract.deployed();
    const contractETS = await ETSContract.deployed();

    return { contractET, contractETS };
};

// coinbase den alınan veri
const loadAccount = async () => {
    const account = window.web3.eth.getCoinbase();
    return account;
};

const loadWeb3 = async() => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
           
            await ethereum.enable();
          
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // kullanıcı girişi iptal ettiğinde.
        }
    }
  
    else {
        console.log('Tarayıcınıza metamask uzantısı ekleyin !');
    }
};