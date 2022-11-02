const { logger, signer, contract } = require('./import');

async function set() {
    [signer.bot] = await ethers.getSigners();

    let balanceOfBot = await signer.bot.getBalance() / (10 ** 18);

    logger.info(`Bot: ${signer.bot.address}, (${balanceOfBot} ETH)`);
}

async function attach() {
    const address = require("../address");

    logger.trace("Attach OracleFeeder");
    contract.oracleFeeder = await ethers.getContractAt(
        "IOracleFeeder",
        address.OracleFeeder
    );

    logger.trace("Attach FOX");
    contract.fox = await ethers.getContractAt(
        "IFOX",
        address.FOX
    );

    logger.trace("Attach FoxFarm");
    contract.foxFarm = await ethers.getContractAt(
        "IFoxFarm",
        address.FoxFarm
    );
}

module.exports = {
    signer,
    contract,
    set,
    attach
}
