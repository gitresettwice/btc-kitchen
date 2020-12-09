const {pluginConfig} = require('./config');

module.exports = {
  run(config, $) {
    if (pluginConfig.get('enabled')) {
      $.on.serverBooted(
          require('./boot/BitcoinPriceUpdater'),
      );
    }
  },
};