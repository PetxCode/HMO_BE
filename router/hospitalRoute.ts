import { Router } from "express";

import multer from "multer";

import validator from "../utils/validator";
import { registerHospital, registerValidator } from "../utils/userValidator";
import {
  HospitalDetail,
  HospitalUpdateDescription,
  HospitalUpdateDetail,
  HospitalUpdateLocation,
  createHospital,
  requestTokenReset,
  signHospital,
  updateHospitalAvatar,
  updateHospitalName,
  updateHospitalPhoneNumber,
  updateHospitalSpecialization,
  verifiedHospital,
  viewAllHospital,
} from "../controller/hospitalController";
const upload = multer().single("avatar");

const router: Router = Router();

router.route("/view-all-hospital").get(viewAllHospital);

router.route("/view-hospital/:hospitalID").get(HospitalDetail);

router
  .route("/register-hospital")
  .post(validator(registerHospital), createHospital);

router.route("/verify-hospital/:hospitalID").get(verifiedHospital);
router.route("/sign-in-hospital").post(signHospital);

router
  .route("/update-hospital-description/:hospitalID")
  .patch(HospitalUpdateDescription);

router.route("/update-hospital-detail/:hospitalID").patch(HospitalUpdateDetail);

router
  .route("/update-hospital-specialization/:hospitalID")
  .patch(updateHospitalSpecialization);

router.route("/update-hospital-name/:hospitalID").patch(updateHospitalName);
router
  .route("/update-hospital-location/:hospitalID")
  .patch(HospitalUpdateLocation);
router
  .route("/update-hospital-phone/:hospitalID")
  .patch(updateHospitalPhoneNumber);

router
  .route("/update-hospital-avatar/:hospitalID")
  .patch(upload, updateHospitalAvatar);

router.route("/reset-token/").patch(requestTokenReset);

export default router;
