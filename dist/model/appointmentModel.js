"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const appointmentModel = new mongoose_1.Schema({
    appointmentID: {
        type: String,
    },
    fullName: {
        type: String,
    },
    sponsorTies: {
        type: String,
    },
    enrollmentID: {
        type: String,
    },
    hospitalName: {
        type: String,
    },
    approve: {
        type: Boolean,
        default: false,
    },
    reason: {
        type: String,
    },
    appointmentDate: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("appointments", appointmentModel);
