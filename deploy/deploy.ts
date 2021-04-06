module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId,
    getUnnamedAccounts,
}) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const token = await deploy("Token", {
        from: deployer,
        args: ["TestToken", "TEST", "1000000000000000000000000"],
    });

    await deploy("Vault", {
        from: deployer,
        // gas: 4000000,
        args: [token.address, deployer],
    });
};
