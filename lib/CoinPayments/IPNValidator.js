/**
 * Modified from https://github.com/OrahKokos/coinpayments-ipn/blob/d1689e2d6335a6c2239a40b48d9564731574e6be/lib/error/index.js#L4
 */
const crypto = require(`crypto`);
const qs = require(`querystring`);

/**
 *
 * @param {String} hmac
 * @param {String} ipnSecret
 * @param {Object} payload
 * @returns {Boolean}
 */
module.exports = function(hmac = ``, ipnSecret = ``, payload) {
  if (!hmac || typeof hmac !== `string`)
    throw new Error(`Invalid hmac!`);
  
  if (!ipnSecret || typeof ipnSecret !== `string`)
    throw new Error(`Invalid ipnSecret!`);
  
  if (typeof payload !== `object`)
    throw new Error(`Payload is not an object!`);
  
  // Coinpayments backend is PHP
  // http://php.net/manual/en/function.urlencode.php
  const paramString = qs.stringify(payload).replace(/%20/g, `+`);
  const calcHmac = crypto.createHmac(`sha512`, ipnSecret).
      update(paramString).
      digest(`hex`);
  
  return hmac === calcHmac;
};