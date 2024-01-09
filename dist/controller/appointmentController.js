"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hospitalAppointmentApproved = exports.viewHospitalAppointment = exports.viewUserAppointment = exports.viewMembersAppointment = exports.creatAppointment = void 0;
const crypto_1 = __importDefault(require("crypto"));
const appointmentModel_1 = __importDefault(require("../model/appointmentModel"));
const memberModel_1 = __importDefault(require("../model/memberModel"));
const hospitalModel_1 = __importDefault(require("../model/hospitalModel"));
const mongoose_1 = require("mongoose");
const userModel_1 = __importDefault(require("../model/userModel"));
const creatAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberID } = req.params;
        const { hospitalName, reason, appointmentDate } = req.body;
        const member = yield memberModel_1.default.findById(memberID);
        const hospital = yield hospitalModel_1.default.findOne({ hospitalName });
        const sponsor = yield userModel_1.default.findOne({ email: member.mainEmail });
        if (member && sponsor && sponsor.email === member.mainEmail) {
            if (hospital) {
                const appointmentID = crypto_1.default.randomBytes(2).toString("hex");
                const user = yield appointmentModel_1.default.create({
                    appointmentID,
                    sponsorTies: member.mainEmail,
                    sponsorenrollmentID: sponsor === null || sponsor === void 0 ? void 0 : sponsor.enrollmentID,
                    fullName: member.firstName + " " + member.middleName + " " + member.lastName,
                    enrollmentID: member.enrollmentID,
                    hospitalName,
                    reason,
                    appointmentDate,
                });
                hospital.appointments.push(new mongoose_1.Types.ObjectId(user._id));
                hospital.save();
                hospital.appointments.push(new mongoose_1.Types.ObjectId(user._id));
                hospital.save();
                member.appointments.push(new mongoose_1.Types.ObjectId(user._id));
                member.save();
                return res.status(200).json({
                    message: "creating appointment",
                    data: user,
                });
            }
            else {
                return res.status(404).json({
                    message: "Error finding hospital",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error finding member",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.creatAppointment = creatAppointment;
const viewMembersAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberID } = req.params;
        const getMember = yield memberModel_1.default.findById(memberID).populate({
            path: "appointments",
        });
        return res.status(200).json({
            message: "reading member",
            data: getMember,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
            data: error,
        });
    }
});
exports.viewMembersAppointment = viewMembersAppointment;
const viewUserAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const getUser = yield userModel_1.default.findById(userID).populate({
            path: "appointments",
        });
        return res.status(200).json({
            message: "reading user",
            data: getUser,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
            data: error,
        });
    }
});
exports.viewUserAppointment = viewUserAppointment;
const viewHospitalAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const getHospital = yield hospitalModel_1.default.findById(hospitalID).populate({
            path: "appointments",
        });
        return res.status(200).json({
            message: "reading hospital",
            data: getHospital,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
            data: error,
        });
    }
});
exports.viewHospitalAppointment = viewHospitalAppointment;
const hospitalAppointmentApproved = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID, appointmentID } = req.params;
        const { doctorName } = req.body;
        const getHospital = yield hospitalModel_1.default.findById(hospitalID);
        const getAppointment = yield appointmentModel_1.default.findById(appointmentID);
        const getDoctor = yield hospitalModel_1.default
            .findOne({ hospitalName: getHospital === null || getHospital === void 0 ? void 0 : getHospital.hospitalName })
            .populate({
            path: "doctors",
        });
        if (getAppointment && getHospital) {
            let doctor = getDoctor === null || getDoctor === void 0 ? void 0 : getDoctor.doctors.some((el) => {
                return el.fullName === doctorName;
            });
            if (doctor) {
                const appointment = yield appointmentModel_1.default.findByIdAndUpdate(appointmentID, { approve: true }, { new: true });
                return res.status(200).json({
                    message: "updating hospital appointment successfully",
                    data: appointment,
                });
            }
            else {
                return res.status(404).json({
                    message: "Doctor couldn't be found",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error approving appointment",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
            data: error,
        });
    }
});
exports.hospitalAppointmentApproved = hospitalAppointmentApproved;
