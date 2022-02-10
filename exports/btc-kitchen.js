module.exports = ($) => ({
  /**
   * Enable this plugin
   */
  enabled: true,
  
  /**
   * Refresh interval in minutes.
   * This only works in production mode.
   */
  refreshInterval: 2,
  
  /**
   * CoinPayment Configs
   */
  coinPaymentsConfig: {
    endpoint: 'https://www.coinpayments.net/api.php',
    keys: {
      key: null,
      secret: null,
      ipnCode: null,
      merchantId: null,
    },
  },
});