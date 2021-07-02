/* global customer:false */
'use strict';

// Initialize local variables
var server = require('server');
server.extend(module.superModule);

/**
 * @typedef  {Object} viewData Represents the view data-collection provided by the response
 * @property {Boolean} newCustomer Describes if the current customer represents a newCustomer
 */

/**
 * @description Extend the createAccount method to call the app.customer.created custom-hook
 * @param name {String} Name of the route to modify
 * @param arguments {Function} List of functions to be appended
 */
server.append('CreateAccount', function (req, res, next) {
    this.on('route:Complete', function (requ, resp) {

        /** @typedef viewData */
        var viewData;
        viewData = resp.getViewData();

        // If the {newCustomer} object is part of the view data, this means the customer just created it's profile
        if (customer.isAuthenticated() && viewData.newCustomer) {
            require('dw/system/HookMgr').callHook(
                'app.customer.created',
                'created',
                customer.getProfile()
            );
        }

    });
    next();
});

module.exports = server.exports();
