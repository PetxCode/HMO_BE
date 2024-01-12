"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const doctorController_1 = require("../controller/doctorController");
const validator_1 = __importDefault(require("../utils/validator"));
const userValidator_1 = require("../utils/userValidator");
const upload = (0, multer_1.default)().single("avatar");
const router = (0, express_1.Router)();
router
    .route("/add-doctor/:hospitalID")
    .post((0, validator_1.default)(userValidator_1.registerDoctor), doctorController_1.createDoctor);
router.route("/view-doctor/:hospitalID").get(doctorController_1.viewMyDoctor);
router.route("/login-doctor/:hospitalID").post(doctorController_1.loginDoctor);
router.route("/doctor-avatar/:doctorID").patch(upload, doctorController_1.updateDoctorAvatar);
router.route("/view-doctor-detail/:doctorID").get(doctorController_1.viewMyDoctorDetail);
router.route("/doctor-phone/:doctorID").patch(doctorController_1.updateDoctorPhoneNumber);
router.route("/doctor-name/:doctorID").patch(doctorController_1.updateDoctorNames);
router.route("/doctor-bio/:doctorID").patch(doctorController_1.updateDoctorBiography);
router.route("/doctor-speciality/:doctorID").patch(doctorController_1.updateDoctorSpeciality);
exports.default = router;
