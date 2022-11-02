require('dotenv').config();
const axios = require('axios');

const API_KEY_MORALIS = process.env.API_KEY_MORALIS;

async function getPrice(chain, address) {
    const options = {
        method: 'GET',
        url: `https://deep-index.moralis.io/api/v2/erc20/${address}/price`,
        params: {
            chain: chain,
            // to_block: '',
            // exchange: '',
        },
        headers: {
            accept: 'application/json',
            'X-API-Key': API_KEY_MORALIS,
        }
    };

    // const res = {
    //     "nativePrice": {
    //         "value": "1019400740872569653",
    //         "decimals": 18,
    //         "name": "Binance Coin",
    //         "symbol": "BNB"
    //     },
    //     "usdPrice": 325.47900295628267,
    //     "exchangeAddress": "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    //     "exchangeName": "PancakeSwap v2"
    // }

    return axios.request(options);
}

module.exports = {
    getPrice
};
