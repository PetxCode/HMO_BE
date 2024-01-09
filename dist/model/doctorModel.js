"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const doctorModel = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
    },
    fullName: {
        type: String,
    },
    hospitalName: {
        type: String,
    },
    speciality: {
        type: String,
    },
    hospitalID: {
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
    hospital: {
        type: mongoose_1.Types.ObjectId,
        ref: "hospitals",
    },
    patientTreated: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "patientTreateds",
        },
    ],
    appointments: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "appointments",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("doctors", doctorModel);
