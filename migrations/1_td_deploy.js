// const BigNumber = require('bignumber.js');

 

var TDErc20 = artifacts.require("ERC20TD.sol");

var evaluator = artifacts.require("Evaluator.sol");

 

 

module.exports = (deployer, network, accounts) => {

    deployer.then(async () => {

        //await deployTDToken(deployer, network, accounts);

        //await deployEvaluator(deployer, network, accounts);

        //await setPermissionsAndRandomValues(deployer, network, accounts);

        //await deployRecap(deployer, network, accounts);

                           await hardCodeContractAddress(deployer,network, accounts);

                           await testDeployment(deployer, network, accounts);

    });

};

 

async function deployTDToken(deployer, network, accounts) {

             TDToken = await TDErc20.new("TD-ERC20-101","TD-ERC20-101",web3.utils.toBN("20000000000000000000000000000"))

}

 

async function deployEvaluator(deployer, network, accounts) {

             Evaluator = await evaluator.new(TDToken.address)

}

 

async function setPermissionsAndRandomValues(deployer, network, accounts) {

             await TDToken.setTeacher(Evaluator.address, true)

             randomSupplies = []

             randomTickers = []

             for (i = 0; i < 20; i++)

                           {

                           randomSupplies.push(Math.floor(Math.random()*1000000000))

                           randomTickers.push(Str.random(5))

                           // randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))

                           // randomTickers.push(Str.random(5))

                           }

 

             console.log(randomTickers)

             console.log(randomSupplies)

             // console.log(web3.utils)

             // console.log(type(Str.random(5)0)

             await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);

}

 

async function deployRecap(deployer, network, accounts) {

             console.log("TDToken " + TDToken.address)

             console.log("Evaluator " + Evaluator.address)

}

 

async function hardCodeContractAddress(deployer, network, accounts) {

             TDToken = await TDErc20.at("0xE518c758f0BEDfd7f5e790Ad9a479B5c38C6F89E")

             Evaluator = await evaluator.at("0x0EDEA548Bb693C539bFf658A3AB181472881Fd15")

}

 

async function testDeployment(deployer, network, accounts){

             getBalance = await TDToken.balanceOf(accounts[1]);

             console.log("Ex1 balance" + getBalance.toString());

 

// ex1

await Evaluator.ex1_getTickerAndSupply({from: accounts[1]});

getBalance = await TDToken.balanceOf(accounts[1]);

console.log("Ex1 balance"+ getBalance.toString());

 

// ex2

assignedTicker = await Evaluator.assignedTicker(accounts[1]);

console.log(assignedTicker)

assignedSupply = new web3.utils.BN(await Evaluator.assignedSupply(accounts[1]));

console.log(assignedSupply.toString())

myERC20= await TDErc20.new(assignedTicker, assignedTicker, assignedSupply.toString(), {from: accounts[1]});

await Evaluator.submitExercice(myERC20.address, {from: accounts[1]});

await Evaluator.ex2_testErc20TickerAndSupply({from: accounts[1]});

getBalance = await TDToken.balanceOf(accounts[1]);

console.log("Ex2 balance" +getBalance.toString());

}

 

// ex3