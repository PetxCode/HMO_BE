"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const validator_1 = __importDefault(require("../utils/validator"));
const userValidator_1 = require("../utils/userValidator");
const hospitalController_1 = require("../controller/hospitalController");
const upload = (0, multer_1.default)().single("avatar");
const router = (0, express_1.Router)();
router
    .route("/register-hospital")
    .post((0, validator_1.default)(userValidator_1.registerHospital), hospitalController_1.createHospital);
router.route("/verify-hospital/:hospitalID").get(hospitalController_1.verifiedHospital);
router.route("/sign-in-hospital").post(hospitalController_1.signHospital);
router
    .route("/update-hospital-description/:hospitalID")
    .patch(hospitalController_1.HospitalUpdateDescription);
router.route("/update-hospital-detail/:hospitalID").patch(hospitalController_1.HospitalUpdateDetail);
router
    .route("/update-hospital-specialization/:hospitalID")
    .patch(hospitalController_1.updateHospitalSpecialization);
router.route("/update-hospital-name/:hospitalID").patch(hospitalController_1.updateHospitalName);
router
    .route("/update-hospital-location/:hospitalID")
    .patch(hospitalController_1.HospitalUpdateLocation);
router
    .route("/update-hospital-phone/:hospitalID")
    .patch(hospitalController_1.updateHospitalPhoneNumber);
router
    .route("/update-hospital-avatar/:hospitalID")
    .patch(upload, hospitalController_1.updateHospitalAvatar);
router.route("/reset-token/").patch(hospitalController_1.requestTokenReset);
exports.default = router;
