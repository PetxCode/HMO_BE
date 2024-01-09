"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hospitalModel = new mongoose_1.Schema({
    location: {
        type: String,
    },
    token: {
        type: String,
    },
    hospitalName: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    verify: {
        type: Boolean,
        unique: false,
    },
    phoneContact: {
        type: String,
    },
    detail: {
        type: String,
    },
    description: {
        type: String,
    },
    specialization: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    doctors: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "doctors",
        },
    ],
    appointments: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "appointments",
        },
    ],
    usageHistory: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "doctors",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("hospital", hospitalModel);
