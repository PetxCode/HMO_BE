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
exports.requestTokenReset = exports.updateUserAvatar = exports.updateUserPhoneNumber = exports.updateUserLocation = exports.updateUserNames = exports.familyHospiatl = exports.readUserDetails = exports.readUserCookie = exports.logOutUser = exports.verifiedUser = exports.signUser = exports.createUser = void 0;
const crypto_1 = __importDefault(require("crypto"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_1 = require("../utils/email");
const streamifier_1 = require("../utils/streamifier");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const token = crypto_1.default.randomBytes(3).toString("hex");
        const enrollmentID = crypto_1.default.randomBytes(4).toString("hex");
        const user = yield userModel_1.default.create({
            email,
            token,
            enrollmentID,
            status: "main",
        });
        (0, email_1.verifiedEmail)(user);
        return res.status(200).json({
            message: "creating user",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.createUser = createUser;
const signUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, token } = req.body;
        const getUser = yield userModel_1.default.findOne({ email });
        if (getUser) {
            if (getUser.token === token) {
                if (getUser.verify) {
                    const encrypt = jsonwebtoken_1.default.sign({ id: getUser._id }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    });
                    req.session.isAuth = true;
                    req.session.userID = getUser._id;
                    return res.status(200).json({
                        message: "welcome back",
                        data: encrypt,
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
exports.signUser = signUser;
const verifiedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(userID, {
                verify: true,
            }, { new: true });
            return res.status(200).json({
                message: "verifying user",
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
exports.verifiedUser = verifiedUser;
const logOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.logOutUser = logOutUser;
const readUserCookie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readUser = req.session.userID;
        return res.status(200).json({
            message: "user cookie read successfully",
            data: readUser,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.readUserCookie = readUserCookie;
const readUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        console.log(user);
        if (user) {
            return res.status(200).json({
                message: "user read",
                data: user,
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
exports.readUserDetails = readUserDetails;
// Choosing Hospital
const familyHospiatl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { choice1, choice2, choice3 } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(userID, {
                familyHospital: [choice1, choice2, choice3],
            }, { new: true });
            return res.status(200).json({
                message: "user hospital added successfully",
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
exports.familyHospiatl = familyHospiatl;
// profile update
const updateUserNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { firstName, middleName, lastName } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(userID, {
                firstName,
                middleName,
                lastName,
            }, { new: true });
            return res.status(200).json({
                message: "user names added",
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
exports.updateUserNames = updateUserNames;
const updateUserLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { location } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(userID, {
                location,
            }, { new: true });
            return res.status(200).json({
                message: "user names added",
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
exports.updateUserLocation = updateUserLocation;
const updateUserPhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { phoneNumber } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(userID, {
                phoneNumber,
            }, { new: true });
            return res.status(200).json({
                message: "user phone number added",
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
exports.updateUserPhoneNumber = updateUserPhoneNumber;
// profile avatar
const updateUserAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const { secure_url, public_id } = yield (0, streamifier_1.streamUpload)(req);
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(userID, {
                avatar: secure_url,
                avatarID: public_id,
            }, { new: true });
            return res.status(200).json({
                message: "user avatar has been, added",
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
exports.updateUserAvatar = updateUserAvatar;
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
