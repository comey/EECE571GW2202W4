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
 	const balance1 = await myToken.balanceOf(admin2);
    const balance2 = await myToken.balanceOf(TOKENSALE_ADDRESS);
    console.log("Before closeing token sale, balances of account1, account2, and sale contract are " + balance0 + " "+ balance1 + " " + balance2);
    const etherBalanceOld = await (await getSigner(admin1)).getBalance();
    console.log("Before closeing the ether balance of account1 is "+ etherBalanceOld);
    const myTokenSale:MyTokenSale = MyTokenSale__factory.connect(TOKENSALE_ADDRESS, await getSigner(admin2));

    //await myTokenSale.endSale();// Expected to fail
    const tx = await myTokenSale.connect(await getSigner(admin1)).endSale();// Expected to fail
    console.log(tx);

    const balance3 = await myToken.balanceOf(admin1);
    const balance4 = await myToken.balanceOf(admin2);
    const balance5= await myToken.balanceOf(TOKENSALE_ADDRESS);
    console.log("After closeing token sale, balances of account1, account2, and sale contract are " + balance3 + " "+ balance4 + " " + balance5);
    const signers = await ethers.getSigners();
    const etherBalanceNew = await signers[0].getBalance();
    console.log("After closeing the ether balance of account1 is "+ etherBalanceNew);
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });