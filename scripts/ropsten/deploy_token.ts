import hre from "hardhat";
const { ethers, getChainId, waffle, getNamedAccounts} = hre;
const { getSigner, getContractFactory } = ethers;
import { parseEther, formatEther} from "ethers/lib/utils";
import { chainName } from "./constans";

async function main() {

    const chainId = parseInt(await getChainId(), 10);
    const {admin1, admin2, admin3} = await getNamedAccounts();

    console.log("==========================================================================================");
    console.log(`Network: ${chainName(chainId)}`);
    console.log(`Network: ${admin1}`);
    console.log(`Network: ${admin2}`);
    console.log(`Network: ${admin3}`);
    console.log(`Start deploying MyToken`);
    console.log("==========================================================================================");


    const MyTokenFactory = await getContractFactory('MyToken');
    const myToken = await MyTokenFactory.deploy('10000000000000000000000', '18');

    console.log(`Token contract has been deployed at https://ropsten.etherscan.io/address/${myToken.address}`);
    console.log("==========================================================================================");
    
    //await testCurrency.mint(admin1, parseEther('10000'));
    //await testCurrency.mint(admin2, parseEther('10000'));
    //await testCurrency.mint(admin3, parseEther('80000'));

    // console.log("\n==================================================================");
    // console.log(`mint 10000 test currency for ADMIN1 at ${admin1}`);
    // console.log(`mint 10000 test currency for ADMIN2 at ${admin2}`);
    // console.log(`mint 80000 test currency for ADMIN3 at ${admin3}`);
    // console.log("==================================================================\n");

    console.log("Deployment ALL DONE !!!!!!");
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });