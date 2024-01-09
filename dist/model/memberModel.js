"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const memberModel = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
    },
    mainEmail: {
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
    relationship: {
        type: String,
    },
    email: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    status: {
        type: String,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
    },
    medicalHistory: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "medicalHistories",
        },
    ],
    appointments: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "appointments",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("members", memberModel);
