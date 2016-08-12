'use strict';

module.exports = function (nemo, drivex, waitTimeout, numRetries) {
    var common = {
        WAIT_TIMEOUT: waitTimeout || 8000, // Wait operation timeout in ms
        NUM_RETRIES: numRetries || 2, // How many times to retry an operation

        doOperationWithRetry: function (operation, retriesLeft) {
            return operation().thenCatch(function (err) {
                if (retriesLeft > 0) {
                    console.log('I am retrying standard!', retriesLeft);
                    nemo.driver.sleep(100);
                    return common.doOperationWithRetry(operation, retriesLeft - 1);
                } else {
                    throw err;
                }
            });
        }
    };

    return common;
};
