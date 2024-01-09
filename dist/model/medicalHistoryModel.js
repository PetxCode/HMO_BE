"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const medicalHistoryModel = new mongoose_1.Schema({
    doctorName: {
        type: String,
    },
    hospitalName: {
        type: String,
    },
    cost: {
        type: Number,
    },
    diagnosis: {
        type: String,
    },
    member: {
        type: mongoose_1.Types.ObjectId,
        ref: "members",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("medicalHistories", medicalHistoryModel);
