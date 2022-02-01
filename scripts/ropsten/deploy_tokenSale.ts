import hre from "hardhat";
const { ethers, getChainId, waffle, getNamedAccounts} = hre;
const { getSigner, getContractFactory } = ethers;
import { parseEther, formatEther} from "ethers/lib/utils";
import { chainName } from "./constans";

require("dotenv").config({ path: require("find-config")("../../.env") });

async function main() {

    const chainId = parseInt(await getChainId(), 10);
    const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS || ""; 

    console.log("==========================================================================================");
    console.log(`Network: ${chainName(chainId)}`);
    console.log(`Start deploying MyTokenSell`);
    console.log("==========================================================================================");
    
    const MyTokenSaleFactory = await getContractFactory('MyTokenSale');
    const myTokenSale = await MyTokenSaleFactory.deploy(TOKEN_ADDRESS,"1");

    console.log(`Token contract has been deployed at https://ropsten.etherscan.io/address/${myTokenSale.address}`);
    console.log("==========================================================================================\n");

    console.log("Deployment ALL DONE !!!!!!");
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });