"use strict";

const TwocheckoutError = require("./error");
const Order = require("./order");
const Helper = require("./helper");

class Subscription {
    constructor(apiCore) {
        this.apiCore = apiCore;
        this.helper = new Helper();
    }

    getSubscriptionFromItems(items) {
        let subscriptionsRefNoArray = {};
        if (items.length > 0) {
            Object.keys(items).forEach((key) => {
                let product = items[key];
                if (
                    "ProductDetails" in product &&
                    "Subscriptions" in product["ProductDetails"] &&
                    product["ProductDetails"]["Subscriptions"].length > 0
                ) {
                    const productSubcriptions = product["ProductDetails"]["Subscriptions"];
                    const lineItemReference = items[key]["LineItemReference"];
                    subscriptionsRefNoArray[lineItemReference] = productSubcriptions;
                }
            });
        }
        return subscriptionsRefNoArray;
    }

    async getSubscriptionsByOrderRefNo(orderRefNo, callback) {
        let order = new Order(this.apiCore);
        let orderData;
        if (typeof callback !== undefined && typeof callback === "function") {
            if (typeof orderRefNo === "string" && orderRefNo.length <= 10) {
                try {
                    orderData = await order.retrieve({ RefNo: orderRefNo });
                    const items = orderData["Items"];
                    const subscriptions = this.getSubscriptionFromItems(items);
                    callback(null, subscriptions);
                } catch (error) {
                    callback(error, null);
                }
            } else {
                callback(new TwocheckoutError("Order reference No is not a string or the size is to big"), null);
            }
        } else {
            return new Promise((resolve, reject) => {
                if (typeof orderRefNo === "string" && orderRefNo.length <= 10) {
                    order
                        .retrieve({ RefNo: orderRefNo })
                        .then((orderData) => {
                            const subscriptions = this.getSubscriptionFromItems(orderData["Items"]);
                            resolve(subscriptions);
                        })
                        .catch((error) => {
                            const parsedResponse = typeof error.response !== "undefined" ? error.response.body : null;
                            if (parsedResponse) {
                                let err = new TwocheckoutError(parsedResponse.error_code, parsedResponse.message);
                                reject(err);
                            }
                        });
                } else {
                    reject(new TwocheckoutError("Order reference No is not a string or the size is too big"));
                }
            });
        }
    }

    async retrieve(searchParams, callback) {
        const args = this.helper.prepareSubForGet(searchParams);
        return await this.apiCore.execute(args, callback);
    }

    async update(updateParams, callback) {
        const args = this.helper.prepareSubForUpdate(updateParams);
        return await this.apiCore.execute(args, callback);
    }

    async enable(updateParams, callback) {
        const args = this.helper.prepareSubForPost(updateParams);
        return await this.apiCore.execute(args, callback);
    }

    async disable(updateParams, callback) {
        const args = this.helper.prepareSubForDelete(updateParams);
        return await this.apiCore.execute(args, callback);
    }
}

module.exports = Subscription;
