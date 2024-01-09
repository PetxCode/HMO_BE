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
exports.updateMemberAvatar = exports.updateMemberPhoneNumber = exports.updateMemberNames = exports.loginMembers = exports.viewMyMemberDetail = exports.viewMyMembers = exports.createMember = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const memberModel_1 = __importDefault(require("../model/memberModel"));
const mongoose_1 = require("mongoose");
const enums_1 = require("../utils/enums");
const email_1 = require("../utils/email");
const streamifier_1 = require("../utils/streamifier");
const crypto_1 = __importDefault(require("crypto"));
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { firstName, relationship } = req.body;
        const getUser = yield userModel_1.default.findById(userID);
        if (getUser) {
            if (relationship.toLowerCase() === enums_1.relationshipValues.WIFE ||
                relationship.toLowerCase() === enums_1.relationshipValues.CHILD ||
                relationship.toLowerCase() === enums_1.relationshipValues.HUSBAND) {
                const enrollmentID = crypto_1.default.randomBytes(4).toString("hex");
                const user = yield memberModel_1.default.create({
                    mainEmail: getUser.email,
                    firstName,
                    enrollmentID,
                    lastName: getUser === null || getUser === void 0 ? void 0 : getUser.lastName,
                    status: "member",
                    relationship: relationship.toLowerCase(),
                });
                getUser.members.push(new mongoose_1.Types.ObjectId(user._id));
                getUser.save();
                (0, email_1.addMemberEmail)(user, getUser).then(() => {
                    console.log("sent");
                });
                return res.status(200).json({
                    message: "creating user",
                    data: user,
                });
            }
            else {
                return res.status(404).json({
                    message: "Relationship Error: Relationship must either be Husband, Wife or Child",
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
            message: "Error adding member",
            data: error.message,
        });
    }
});
exports.createMember = createMember;
const viewMyMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const getUser = yield userModel_1.default.findById(userID).populate({
            path: "members",
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
exports.viewMyMembers = viewMyMembers;
const viewMyMemberDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberID } = req.params;
        const getUser = yield memberModel_1.default.findById(memberID);
        return res.status(200).json({
            message: "reading member",
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
exports.viewMyMemberDetail = viewMyMemberDetail;
const loginMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { firstName, token } = req.body;
        const getUser = yield userModel_1.default.findById(userID).populate({
            path: "members",
        });
        let getMember = getUser === null || getUser === void 0 ? void 0 : getUser.members.some((el) => el.firstName === firstName);
        if (getMember && getUser.token === token) {
            return res.status(200).json({
                message: "welcoming member in",
                data: getUser,
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
exports.loginMembers = loginMembers;
const updateMemberNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberID } = req.params;
        const { firstName, middleName, lastName } = req.body;
        const user = yield memberModel_1.default.findById(memberID);
        if (user) {
            const updatedUser = yield memberModel_1.default.findByIdAndUpdate(memberID, {
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
exports.updateMemberNames = updateMemberNames;
const updateMemberPhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberID } = req.params;
        const { phoneNumber } = req.body;
        const user = yield memberModel_1.default.findById(memberID);
        if (user) {
            const updatedUser = yield memberModel_1.default.findByIdAndUpdate(memberID, {
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
exports.updateMemberPhoneNumber = updateMemberPhoneNumber;
// profile avatar
const updateMemberAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberID } = req.params;
        const user = yield userModel_1.default.findById(memberID);
        if (user) {
            const { secure_url, public_id } = yield (0, streamifier_1.streamUpload)(req);
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(memberID, {
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
exports.updateMemberAvatar = updateMemberAvatar;
