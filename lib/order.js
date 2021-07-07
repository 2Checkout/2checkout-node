"use strict";
const Helper = require("./helper");

class Order {
    constructor(apiCore) {
        this.apiCore = apiCore;
        this.helper = new Helper();
    }

    async create(payload, callback) {
        return await this.apiCore.execute(this.helper.prepareArgsForPost(payload), callback);
    }

    async retrieve(searchParams, callback) {
        return await this.apiCore.execute(this.helper.prepareArgsForGet(searchParams), callback);
    }
}

module.exports = Order;
