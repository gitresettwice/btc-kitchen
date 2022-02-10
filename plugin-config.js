const Tools = require('@xpresser/plugin-tools');
const {namespace} = require('./use.json');
const importableConfig = require('./exports/btc-kitchen');

/**
 * export
 * @type {{pluginConfig: import("object-collection"), foundConfigFile: boolean, $: Xpresser.DollarSign}}
 */
module.exports = Tools.ConfigHelpers.loadPluginConfig({
  namespace,
  type: 'function',
  configFile: 'btc-kitchen',
  default: importableConfig,
});