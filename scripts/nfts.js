require('dotenv').config();
const axios = require('axios');

const API_KEY_MORALIS = process.env.API_KEY_MORALIS;

async function getNft(chain, address, token) {
    const options = {
        method: 'GET',
        url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
        params: {
            chain: chain,
            // to_block: '',
            // exchange: '',
            format: 'decimal',
            token_addresses: token,
        },
        headers: {
            accept: 'application/json',
            'X-API-Key': API_KEY_MORALIS,
        }
    };

    return axios.request(options);
}

async function main() {
    // const CHAIN_NAME = process.env.CHAIN_NAME;
    const CHAIN_NAME = "bsc testnet";

    const ADDRESS_USER = process.env.ADDRESS_USER;
    const ADDRESS_FOXFARM = process.env.ADDRESS_FOXFARM;

    const response = await getNft(CHAIN_NAME, ADDRESS_USER, ADDRESS_FOXFARM);
    const ids = response.data.result.map(function(x) {
        return x.token_id;
    });
    console.log(ids);
}

module.exports = {
    getNft
};

// run
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
