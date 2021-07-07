"use strict";

const TwocheckoutError = require("./error");

class Helper {
    addSrcToParams(params) {
        if ("prod" in params) {
            params.src = "NodeJsLibrary";
        }
        if ("Items" in params) {
            params.Source = "NodeJsLibrary";
        }
        return params;
    }

    prepareArgsForGet(args) {
        let path = typeof args.path !== "undefined" ? args.path : "/orders";
        let searchParams = null;

        //If RefNo then we only search by it
        if ("RefNo" in args) {
            path += "/" + args.RefNo + "/";
        } else {
            searchParams = args;
        }

        let apiArgs = { method: "GET", path: path };
        if (searchParams !== null) {
            apiArgs.searchParams = searchParams;
        }
        return apiArgs;
    }

    prepareArgsForPost(payload) {
        const apiArgs = {
            method: "POST",
            payload: payload,
            path: "/orders",
        };
        return apiArgs;
    }

    prepareSubForGet(args) {
        let path = typeof args.path !== "undefined" ? args.path : "/subscriptions";
        let apiArgs = { method: "GET", path: path };
        //If RefNo then we only search by it
        if ("subRefId" in args) {
            path += "/" + args.subRefId + "/";
            apiArgs.path = path;
        } else if ("subParams" in args) {
            apiArgs.searchParams = args.subParams;
        } else {
            apiArgs.searchParams = args;
        }
        return apiArgs;
    }

    prepareSubForUpdate(args) {
        let path = typeof args.path !== "undefined" ? args.path : "/subscriptions";

        if (path !== null || "subRefId" in args) {
            if ("subRefId" in args) {
                path += "/" + args.subRefId + "/";
            }

            let apiArgs = { method: "PUT", path: path };
            if ("subParams" in args) {
                apiArgs.payload = args.subParams;
            }
            return apiArgs;
        }
    }

    prepareSubForPost(args) {
        let path = typeof args.path !== "undefined" ? args.path : "/subscriptions";
        let apiArgs = { method: "POST", path: path };
        if ("subRefId" in args) {
            //Enable subscription path
            path += "/" + args.subRefId + "/";
            apiArgs.path = path;
        } else {
            //Just search for subscriptions by parameters (e.q. CustomerEmail, DeliveredCode, AvangateCustomerReference)
            apiArgs.payload = args;
        }

        return apiArgs;
    }

    prepareSubForDelete(args) {
        let path = typeof args.path !== "undefined" ? args.path : "/subscriptions";

        if ("subRefId" in args) {
            path += "/" + args.subRefId + "/";
        }
        return { method: "DELETE", path: path };
    }
}

module.exports = Helper;
