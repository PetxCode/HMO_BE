"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controller/appointmentController");
const router = (0, express_1.Router)();
router.route("/create-appointment/:memberID").post(appointmentController_1.creatAppointment);
router.route("/view-member-appointment/:memberID").get(appointmentController_1.viewMembersAppointment);
router.route("/view-user-appointment/:userID").get(appointmentController_1.viewUserAppointment);
router
    .route("/view-hospital-appointment/:hospitalID")
    .get(appointmentController_1.viewHospitalAppointment);
router
    .route("/appointment-approved/:hospitalID/:appointmentID ")
    .patch(appointmentController_1.hospitalAppointmentApproved);
exports.default = router;
