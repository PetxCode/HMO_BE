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
exports.requestTokenReset = exports.updateHospitalAvatar = exports.updateHospitalPhoneNumber = exports.updateHospitalSpecialization = exports.HospitalUpdateDetail = exports.HospitalUpdateDescription = exports.HospitalUpdateLocation = exports.updateHospitalName = exports.logOutHospital = exports.verifiedHospital = exports.viewAllHospital = exports.signHospital = exports.HospitalDetail = exports.createHospital = void 0;
const crypto_1 = __importDefault(require("crypto"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_1 = require("../utils/email");
const streamifier_1 = require("../utils/streamifier");
const dotenv_1 = __importDefault(require("dotenv"));
const hospitalModel_1 = __importDefault(require("../model/hospitalModel"));
dotenv_1.default.config();
const createHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, hospitalName } = req.body;
        const token = crypto_1.default.randomBytes(3).toString("hex");
        const enrollmentID = crypto_1.default.randomBytes(4).toString("hex");
        const user = yield hospitalModel_1.default.create({
            email,
            hospitalName,
            token,
            enrollmentID,
            status: "hospital",
        });
        (0, email_1.hospitalVerifiedEmail)(user);
        return res.status(200).json({
            message: "creating hospital",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
            data: error,
        });
    }
});
exports.createHospital = createHospital;
const HospitalDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const hospital = yield hospitalModel_1.default.findById(hospitalID);
        return res.status(200).json({
            message: "hospital detail",
            data: hospital,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.HospitalDetail = HospitalDetail;
const signHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, token } = req.body;
        const getHospital = yield hospitalModel_1.default.findOne({ email });
        if (getHospital) {
            if (getHospital.token === token) {
                if (getHospital === null || getHospital === void 0 ? void 0 : getHospital.verify) {
                    const encrypt = jsonwebtoken_1.default.sign({ id: getHospital._id }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    });
                    req.session.isAuth = true;
                    req.session.hospitalID = getHospital._id;
                    return res.status(200).json({
                        message: "welcome back",
                        dat: encrypt,
                    });
                }
                else {
                    return res.status(404).json({
                        message: "Account has not yet been verified",
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "Error reading token",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error reading user",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.signHospital = signHospital;
const viewAllHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hospital = yield hospitalModel_1.default.find();
        return res.status(200).json({
            message: "view all hospital",
            data: hospital,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.viewAllHospital = viewAllHospital;
const verifiedHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const hospital = yield hospitalModel_1.default.findById(hospitalID);
        if (hospital) {
            const updatedhospital = yield hospitalModel_1.default.findByIdAndUpdate(hospitalID, {
                verify: true,
            }, { new: true });
            return res.status(200).json({
                message: "verifying hospital",
                data: updatedhospital,
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
exports.verifiedHospital = verifiedHospital;
const logOutHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy();
        return res.status(200).json({
            message: "user has been logged out",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.logOutHospital = logOutHospital;
// profile update
const updateHospitalName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const { hospitalName } = req.body;
        const user = yield hospitalModel_1.default.findById(hospitalID);
        if (user) {
            const updatedUser = yield hospitalModel_1.default.findByIdAndUpdate(hospitalID, {
                hospitalName,
            }, { new: true });
            return res.status(200).json({
                message: "hospital names added",
                data: updatedUser,
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
exports.updateHospitalName = updateHospitalName;
const HospitalUpdateLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const { location } = req.body;
        const hospital = yield hospitalModel_1.default.findById(hospitalID);
        if (hospital) {
            const updatedHospital = yield hospitalModel_1.default.findByIdAndUpdate(hospitalID, {
                location,
            }, { new: true });
            return res.status(200).json({
                message: "hospital location added",
                data: updatedHospital,
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
exports.HospitalUpdateLocation = HospitalUpdateLocation;
const HospitalUpdateDescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const { description } = req.body;
        const hospital = yield hospitalModel_1.default.findById(hospitalID);
        if (hospital) {
            const updatedHospital = yield hospitalModel_1.default.findByIdAndUpdate(hospitalID, {
                description,
            }, { new: true });
            return res.status(200).json({
                message: "hospital location added",
                data: updatedHospital,
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
exports.HospitalUpdateDescription = HospitalUpdateDescription;
const HospitalUpdateDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const { detail } = req.body;
        const hospital = yield hospitalModel_1.default.findById(hospitalID);
        if (hospital) {
            const updatedHospital = yield hospitalModel_1.default.findByIdAndUpdate(hospitalID, {
                detail,
            }, { new: true });
            return res.status(200).json({
                message: "hospital location added",
                data: updatedHospital,
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
exports.HospitalUpdateDetail = HospitalUpdateDetail;
const updateHospitalSpecialization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const { specialization } = req.body;
        const hospital = yield hospitalModel_1.default.findById(hospitalID);
        if (hospital) {
            const updatedHospital = yield hospitalModel_1.default.findByIdAndUpdate(hospitalID, {
                specialization,
            }, { new: true });
            return res.status(200).json({
                message: "hospital phone number added",
                data: updatedHospital,
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
exports.updateHospitalSpecialization = updateHospitalSpecialization;
const updateHospitalPhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const { phoneContact } = req.body;
        const hospital = yield hospitalModel_1.default.findById(hospitalID);
        if (hospital) {
            const updatedHospital = yield hospitalModel_1.default.findByIdAndUpdate(hospitalID, {
                phoneContact,
            }, { new: true });
            return res.status(200).json({
                message: "hospital phone number added",
                data: updatedHospital,
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
exports.updateHospitalPhoneNumber = updateHospitalPhoneNumber;
// profile avatar
const updateHospitalAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalID } = req.params;
        const hospital = yield hospitalModel_1.default.findById(hospitalID);
        if (hospital) {
            const { secure_url, public_id } = yield (0, streamifier_1.streamUpload)(req);
            const updatedHospital = yield hospitalModel_1.default.findByIdAndUpdate(hospitalID, {
                avatar: secure_url,
                avatarID: public_id,
            }, { new: true });
            return res.status(200).json({
                message: "hospital avatar has been, added",
                data: updatedHospital,
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
exports.updateHospitalAvatar = updateHospitalAvatar;
// reset Token
const requestTokenReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { token, email } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            if (user.token === token && user.verify) {
                const newToken = crypto_1.default.randomBytes(3).toString("hex");
                const updatedUser = yield userModel_1.default.findByIdAndUpdate(userID, {
                    token: newToken,
                }, { new: true });
                (0, email_1.changeTokenEmail)(updatedUser);
                return res.status(200).json({
                    message: "Your request has been updated",
                    data: updatedUser,
                });
            }
            else {
                return res.status(404).json({
                    message: "Please enter correct old token",
                });
            }
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
exports.requestTokenReset = requestTokenReset;
