import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import '@typechain/hardhat'
import "hardhat-deploy";
import {networks} from "./hardhat.networks";
const ADMIN1 = process.env.ADMIN1;
const ADMIN2 = process.env.ADMIN2;
const ADMIN3 = process.env.ADMIN3;
const config =  {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5"
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  networks,
  namedAccounts: {
    // deployer: {  // check on chainid https://chainid.network/
    //   default: 0,  // first account as deployer
    //   1: 0, // Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    // },

    admin1: {
      default: ADMIN1,
    },

    admin2: {
      default: ADMIN2,
    },

    admin3: {
      default: ADMIN3,
    }
  },
};

module.exports = config;
