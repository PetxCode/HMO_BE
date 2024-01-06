import { Router } from "express";

import multer from "multer";
import {
  createDoctor,
  loginDoctor,
  updateDoctorAvatar,
  updateDoctorBiography,
  updateDoctorNames,
  updateDoctorPhoneNumber,
  updateDoctorSpeciality,
  viewMyDoctor,
  viewMyDoctorDetail,
} from "../controller/doctorController";
import validator from "../utils/validator";
import { registerDoctor } from "../utils/userValidator";
const upload = multer().single("avatar");

const router: Router = Router();

router
  .route("/add-doctor/:userID")
  .post(validator(registerDoctor), createDoctor);
router.route("/view-doctor/:userID").get(viewMyDoctor);
router.route("/login-doctor/:userID").post(loginDoctor);

router.route("/doctor-avatar/:doctorID").patch(upload, updateDoctorAvatar);

router.route("/view-doctor-detail/:doctorID").get(viewMyDoctorDetail);

router.route("/doctor-phone/:doctorID").patch(updateDoctorPhoneNumber);
router.route("/doctor-name/:doctorID").patch(updateDoctorNames);
router.route("/doctor-bio/:doctorID").patch(updateDoctorBiography);
router.route("/doctor-speciality/:doctorID").patch(updateDoctorSpeciality);

export default router;
