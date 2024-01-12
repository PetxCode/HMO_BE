"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = exports.registerMember = exports.registerDoctor = exports.registerHospital = exports.registerValidator = void 0;
const joi_1 = __importDefault(require("joi"));
let regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
exports.registerValidator = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.registerHospital = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    hospitalName: joi_1.default.string().required(),
});
exports.registerDoctor = joi_1.default.object({
    fullName: joi_1.default.string().required(),
});
exports.registerMember = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    relationship: joi_1.default.string().required(),
});
exports.passwordValidator = joi_1.default.object({
    password: joi_1.default.string().pattern(new RegExp(regex)).required(),
    confirm: joi_1.default.ref("password"),
});
