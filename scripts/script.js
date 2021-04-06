// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
// const { ROPSTEN_DAI_ADDR, ROPSTEN_TELLOR_ADDR } = require("./data");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');
    const [deployer] = ethers.getSigners();

    const Token = await hre.ethers.getContractFactory("Token");
    const testToken = await Token.deploy("TEST");

    await testToken.deployed();
    testTokenAddr = testToken.address;
    console.log("test token TEST deployed to:", testTokenAddr);

    const Vault = await hre.ethers.getContractFactory("Vault");
    const testVault = await Vault.deploy(testToken.address, deployer);

    await testVault.deployed();
    console.log("TEST vault deployed to:", testVault.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
