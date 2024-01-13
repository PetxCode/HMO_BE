"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentModel = new mongoose_1.Schema({
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    paymentReferenceID: {
        type: String,
    },
    cost: {
        type: Number,
    },
    subscriptionPlan: {
        type: String,
    },
    userID: {
        type: String,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("payments", paymentModel);
