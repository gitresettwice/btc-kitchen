module.exports = {
    run(config, $) {
        $.on.serverBooted(
            require('./boot/BitcoinPriceUpdater')
        );
    }
}