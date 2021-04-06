import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "@symfoni/hardhat-react";
import "hardhat-typechain";
import "@typechain/ethers-v5";

// export const ROPSTEN_DAI_ADDR = 0xb5e5d0f8c0cba267cd3d7035d6adc8eba7df7cdd;
// export const ROPSTEN_TELLOR_ADDR = 0x20374e579832859f180536a69093a126db1c8ae9;

require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
    react: {
        providerPriority: ["web3modal", "hardhat"],
    },
    networks: {
        hardhat: {
            gas: "auto",
        },
        ropsten: {
            url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [`0x${process.env.ROPSTEN_PRIVATE_KEY}`],
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.7.3",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 50,
                    },
                },
            },
        ],
    },
};
export default config;
