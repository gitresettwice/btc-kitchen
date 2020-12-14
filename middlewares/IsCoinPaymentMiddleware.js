const IPNValidator = require('../lib/CoinPayments/IPNValidator');
const $ = xpresserInstance();
/**
 * Error Handler
 * @param http
 * @param error
 */
const error = (http, error) => http.res.status(401).send({error});
const ipnCode = $.env('coinPaymentIpnCode');
const merchantCode = $.env('coinPaymentMerchantCode');

/**
 * IsCoinPaymentMiddleware
 * @param {Xpresser.Http} http
 */
module.exports = (http) => {
    // Check for headers
    const headers = http.req['headers'];
    if (!headers || !headers['hmac'])
        return error(http, `No valid headers in request!`);

    // Check Expected Body fields.
    const body = http.$body;

    // Check if merchant codes match
    const merchantCodeFromRequest = body.get('merchant');
    if (merchantCodeFromRequest !== merchantCode)
        return error(http, `Invalid merchant code!`);

    // Validate Hmac
    const hmac = headers['hmac'];
    if (!IPNValidator(hmac, ipnCode, body.all()))
        return error(http, 'Hmac validation failed!')

    return http.next();
};
