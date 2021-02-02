const moment = require('moment');
const BtcKitchen = require('../BtcKitchen');
const {$, pluginConfig} = require('../plugin-config');

const $store = $.store.path('BtcKitchen');
const refreshInterval = pluginConfig.get('refreshInterval', 2);

function callPriceChecker() {
  const priceDotJsonPath = $.path.storage('btc-kitchen/price.json');
  $.file.makeDirIfNotExist(priceDotJsonPath, true);
  let priceFromCache = false;
  
  // check if price.json exists
  if ($.file.exists(priceDotJsonPath)) {
    const priceDotJson = $.file.readJson(priceDotJsonPath);
    
    if (priceDotJson['lastUpdated'] && moment(priceDotJson['lastUpdated']).
        add(refreshInterval, 'minutes').
        isAfter()) {
      // if it's not upto 2mins after last update
      $store.set('currentPrice', priceDotJson);
      priceFromCache = true;
    }
  }
  
  if (!priceFromCache) {
    BtcKitchen.checkBitcoinPrice().then((price) => {
      const lastUpdated = new Date();
      const hash = $.base64.encode(`${price}|${lastUpdated.getTime()}`);
      
      $store.set('currentPrice', {
        value: price,
        lastUpdated,
        hash,
      });
      
      $.file.saveToJson(
          priceDotJsonPath,
          $store.get('currentPrice'),
          {checkIfFileExists: false},
      );
    }).catch($.logError);
  }
}

function loopPriceCheck(mins = 2) {
  setTimeout(() => {
        // Set new refresh timeout
        loopPriceCheck(mins);
        // Update price in store.
        callPriceChecker();
      },
      1000 * (mins * 60),
  );
}

module.exports = async next => {
  callPriceChecker();
  
  if ($.config.get('env') === 'production')
    loopPriceCheck(refreshInterval);
  
  return next();
};