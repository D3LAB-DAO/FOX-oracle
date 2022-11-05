const { logger, signer, contract } = require('./import');
const { set, attach } = require('./set');
const { sendPriceMessage } = require('./telegram');
const { getPrice } = require('./oracle');

const CHAIN_NAME = process.env.CHAIN_NAME;

const ADDRESS_WBNB = process.env.ADDRESS_WBNB;

const ORACLE_INTERVAL = process.env.ORACLE_INTERVAL;

async function parsePrice(chain, address) {
    try {
        const response = await getPrice(chain, address);
        const price = response.data.usdPrice;
        const exchange = response.data.exchangeName;
        logger.info(`USD Price: ${price}, From: ${exchange}`);
        return price;
    } catch (e) {
        logger.error(e);
        return -1;
    }
}

async function updatePrice(price) {
    const beforePrice = await contract.foxFarm.getCollateralPrice();
    logger.trace(beforePrice);

    const txRes = await contract.oracleFeeder.connect(signer.bot).updateCollateralPrice(
        BigInt(price),
        BigInt(0)
    );
    await txRes.wait();

    const afterPrice = await contract.foxFarm.getCollateralPrice();

    logger.info(`Price Update: ${beforePrice} -> ${afterPrice}`);
}

async function loop() {
    while (true) {
        logger.trace("Get Price");
        const price = parseFloat(await parsePrice(CHAIN_NAME, ADDRESS_WBNB));
        const multipliedPrice = parseInt(price * 10000);

        logger.trace("Send Price Message");
        sendPriceMessage(multipliedPrice);

        logger.trace("Update Price");
        updatePrice(multipliedPrice);

        logger.trace(`Sleep: ${ORACLE_INTERVAL}ms`);
        await sleep(ORACLE_INTERVAL);
    }
}

async function main() {
    logger.trace("Set");
    await set();

    logger.trace("Attach");
    await attach();

    logger.trace("Loop");
    await loop();
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

// run
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
