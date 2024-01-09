"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    location: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    firstName: {
        type: String,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    token: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
    },
    members: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "members",
        },
    ],
    appointments: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "appointments",
        },
    ],
    medicalHistory: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "medicalHistories",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("user", userModel);
