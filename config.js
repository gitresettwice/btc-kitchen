const $ = xpresserInstance();
const {namespace} = require('./use.json');
const userDefinedConfig = $.config.get(`plugins[${namespace}]`, {});

const pluginConfig = $.objectCollection(
    require('./exports/btc-kitchen')
);

pluginConfig.merge(userDefinedConfig);

module.exports = pluginConfig;