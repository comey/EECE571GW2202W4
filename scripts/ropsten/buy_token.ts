import hre from "hardhat";
const BigNumber = require('big-number');
const { ethers, getChainId, waffle, getNamedAccounts} = hre;
const { getSigner, getContractFactory, getContractAt} = ethers;
import { parseEther, formatEther} from "ethers/lib/utils";
import { chainName } from "./constans";

import {MyToken, MyToken__factory, MyTokenSale, MyTokenSale__factory} from '../../types'


require("dotenv").config({ path: require("find-config")("../../.env") });

async function main() {

    const chainId = parseInt(await getChainId(), 10);
    const {admin1, admin2, admin3} = await getNamedAccounts();
    const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS || ""; 
    const TOKENSALE_ADDRESS = process.env.TOKENSALE_ADDRESS || ""; 

    console.log("\n==========================================================================================");
    console.log(`Network: ${chainName(chainId)}`);
    console.log("==========================================================================================\n");


    console.log("\n==========================================================================================");
    console.log(`start update land 1 & 2 appraisal in  Land Registration SC`);
    console.log("==========================================================================================\n");
    const myToken:MyToken = MyToken__factory.connect(TOKEN_ADDRESS, await getSigner(admin1));
    const balance0 = await myToken.balanceOf(admin1);
    const balance1 = await myToken.balanceOf(TOKENSALE_ADDRESS);
    console.log("Before sending tokens to sale contract, balance of deployer is " + balance0, "constract balcne is " + balance1);
    
    await myToken.connect(await getSigner(admin1)).transfer(TOKENSALE_ADDRESS,balance0);
    const balance2 = await myToken.balanceOf(admin1);
    const balance3 = await myToken.balanceOf(TOKENSALE_ADDRESS);
    console.log("After sending tokens to sale contract, balance of deployer is " + balance2, "constract balcne is " + balance3);
    

    const myTokenSale:MyTokenSale = MyTokenSale__factory.connect(TOKENSALE_ADDRESS, await getSigner(admin2))
    const signers = await ethers.getSigners();
    const etherBalance = await signers[1].getBalance();
    const numberOfTokensCanBuy = await (await myTokenSale.tokenPrice()).mul(etherBalance);
    console.log("Ether balance of "+ admin2+ " is "+etherBalance+ ", which can buy "+numberOfTokensCanBuy+ " tokens.");
    //const gasRequired = await myTokenSale.connect(signers[1]).estimateGas.buyTokens(numberOfTokensCanBuy, {value: "100000000000000000"});
    
    const tx = await myTokenSale.connect(signers[1]).buyTokens('100000000000000000', {value: '100000000000000000'});
    console.log(tx);
    // console.log(`update land 2 appraisal ....`);
	// await LRSC.addOrUpdateLandAppraisal(2, 1000, 90);
	// await LRSC.connect(await getSigner(admin2)).approveLandAppraisal(2)
    
    // console.log("\n==========================================================================================");
    // console.log(`updated successfully`);
    // console.log("==========================================================================================\n");

    // console.log("ALL DONE !!!!!!");
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });