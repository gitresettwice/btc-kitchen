module.exports = {
    enabled: true,
    coinPaymentsConfig: () => ({
        endpoint: ' https://www.coinpayments.net/api.php',
        keys: {
            key: null,
            secret: null,
        }
    })
}