const axios = require('axios');
const $ = xpresserInstance();

class BtcKitchen {
    static async checkBitcoinPrice() {

        const endpoint = `https://blockchain.info/ticker`;
        let {data} = await axios.get(endpoint);

        if (data) {
            data = $.objectCollection(data);
            if (data.has('USD[15m]')) {
                return data.get('USD[15m]');
            }
        }

        throw Error(`Could not parse from ${endpoint}`)
    }
}

module.exports = BtcKitchen;