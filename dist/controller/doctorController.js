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
exports.updateDoctorAvatar = exports.viewMyDoctorDetail = exports.updateDoctorPhoneNumber = exports.updateDoctorSpeciality = exports.updateDoctorBiography = exports.updateDoctorEmail = exports.updateDoctorNames = exports.loginDoctor = exports.viewMyDoctor = exports.createDoctor = void 0;
const mongoose_1 = require("mongoose");
const streamifier_1 = require("../utils/streamifier");
const doctorModel_1 = __importDefault(require("../model/doctorModel"));
const hospitalModel_1 = __importDefault(require("../model/hospitalModel"));
const createDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const { fullName } = req.body;
        const getHospital = yield hospitalModel_1.default.findById(hospitalID);
        if (getHospital) {
            const doctor = yield doctorModel_1.default.create({
                hospitalID,
                fullName,
                status: "doctor",
                relationship: "staff",
                hospitalName: getHospital === null || getHospital === void 0 ? void 0 : getHospital.hospitalName,
            });
            getHospital.doctors.push(new mongoose_1.Types.ObjectId(doctor._id));
            getHospital.save();
            return res.status(200).json({
                message: "creating doctor",
                data: doctor,
            });
        }
        else {
            return res.status(404).json({
                message: "Error reading user",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error adding member",
            data: error.message,
        });
    }
});
exports.createDoctor = createDoctor;
const viewMyDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const gethospital = yield hospitalModel_1.default.findById(hospitalID).populate({
            path: "doctors",
        });
        return res.status(200).json({
            message: "reading hospital",
            data: gethospital,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
            data: error,
        });
    }
});
exports.viewMyDoctor = viewMyDoctor;
const loginDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const { firstName, lastName, token } = req.body;
        const getHospital = yield hospitalModel_1.default.findById(hospitalID).populate({
            path: "doctors",
        });
        let getDoctorFirstName = getHospital === null || getHospital === void 0 ? void 0 : getHospital.doctors.some((el) => el.firstName === firstName);
        let getDoctorLastName = getHospital === null || getHospital === void 0 ? void 0 : getHospital.doctors.some((el) => el.lastName === lastName);
        if (getDoctorFirstName &&
            getDoctorLastName &&
            getHospital.token === token) {
            return res.status(200).json({
                message: "welcoming doctor in",
                data: getHospital,
            });
        }
        else {
            return res.status(404).json({
                message: "You can't be allowed in",
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
exports.loginDoctor = loginDoctor;
const updateDoctorNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorID } = req.params;
        const { fullName } = req.body;
        const doctor = yield doctorModel_1.default.findById(doctorID);
        if (doctor) {
            const updatedDoctor = yield doctorModel_1.default.findByIdAndUpdate(doctorID, {
                fullName,
            }, { new: true });
            return res.status(200).json({
                message: "doctor names added",
                data: updatedDoctor,
            });
        }
        else {
            return res.status(404).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.updateDoctorNames = updateDoctorNames;
const updateDoctorEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorID } = req.params;
        const { email } = req.body;
        const doctor = yield doctorModel_1.default.findById(doctorID);
        if (doctor) {
            const updatedDoctor = yield doctorModel_1.default.findByIdAndUpdate(doctorID, {
                email,
            }, { new: true });
            return res.status(200).json({
                message: "doctor names added",
                data: updatedDoctor,
            });
        }
        else {
            return res.status(404).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.updateDoctorEmail = updateDoctorEmail;
const updateDoctorBiography = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorID } = req.params;
        const { biography } = req.body;
        const doctor = yield doctorModel_1.default.findById(doctorID);
        if (doctor) {
            const updatedDoctor = yield doctorModel_1.default.findByIdAndUpdate(doctorID, {
                biography,
            }, { new: true });
            return res.status(200).json({
                message: "doctor names added",
                data: updatedDoctor,
            });
        }
        else {
            return res.status(404).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.updateDoctorBiography = updateDoctorBiography;
const updateDoctorSpeciality = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorID } = req.params;
        const { speciality } = req.body;
        const doctor = yield doctorModel_1.default.findById(doctorID);
        if (doctor) {
            const updatedDoctor = yield doctorModel_1.default.findByIdAndUpdate(doctorID, {
                speciality,
            }, { new: true });
            return res.status(200).json({
                message: "doctor names added",
                data: updatedDoctor,
            });
        }
        else {
            return res.status(404).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.updateDoctorSpeciality = updateDoctorSpeciality;
const updateDoctorPhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorID } = req.params;
        const { phoneNumber } = req.body;
        const doctor = yield doctorModel_1.default.findById(doctorID);
        if (doctor) {
            const updatedDoctor = yield doctorModel_1.default.findByIdAndUpdate(doctorID, {
                phoneNumber,
            }, { new: true });
            return res.status(200).json({
                message: "doctor phone number added",
                data: updatedDoctor,
            });
        }
        else {
            return res.status(404).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.updateDoctorPhoneNumber = updateDoctorPhoneNumber;
const viewMyDoctorDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorID } = req.params;
        const getDoctor = yield doctorModel_1.default.findById(doctorID);
        return res.status(200).json({
            message: "reading doctor",
            data: getDoctor,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error viwing Doctor",
            data: error,
        });
    }
});
exports.viewMyDoctorDetail = viewMyDoctorDetail;
// profile avatar
const updateDoctorAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorID } = req.params;
        const doctor = yield doctorModel_1.default.findById(doctorID);
        if (doctor) {
            const { secure_url, public_id } = yield (0, streamifier_1.streamUpload)(req);
            const updatedDoctor = yield doctorModel_1.default.findByIdAndUpdate(doctorID, {
                avatar: secure_url,
                avatarID: public_id,
            }, { new: true });
            return res.status(200).json({
                message: "doctor avatar has been, added",
                data: updatedDoctor,
            });
        }
        else {
            return res.status(404).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.updateDoctorAvatar = updateDoctorAvatar;
