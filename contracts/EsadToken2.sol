// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract EsadToken2 is ERC20 {
    constructor() ERC20("EsadToken2", "ET2"){
        _mint(msg.sender, 1000000000 * 10**18);
    }
}