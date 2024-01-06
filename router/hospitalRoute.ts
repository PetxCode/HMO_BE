import { Router } from "express";

import multer from "multer";

import validator from "../utils/validator";
import { registerValidator } from "../utils/userValidator";
import {
    HospitalUpdateDescription,
  HospitalUpdateDetail,
  HospitalUpdateLocation,
  createHospital,
  requestTokenReset,
  signHospital,
  updateHospitalAvatar,
  updateHospitalName,
  updateHospitalPhoneNumber,
  verifiedHospital,
} from "../controller/hospitalController";
const upload = multer().single("avatar");

const router: Router = Router();

router
  .route("/register-hospital")
  .post(validator(registerValidator), createHospital);
router.route("/verify-hospital/:hospitalID").get(verifiedHospital);
router.route("/sign-in-hospital").post(signHospital);

router
  .route("/update-hospital-description/:hospitalID")
  .patch(HospitalUpdateDescription);
router
  .route("/update-hospital-detail/:hospitalID")
  .patch(HospitalUpdateDetail);

router.route("/update-hospital-name/:hospitalID").patch(updateHospitalName);
router
  .route("/update-hospital-location/:hospitalID")
  .patch(HospitalUpdateLocation);
router
  .route("/update-hospital-phone/:hospitalID")
  .patch(updateHospitalPhoneNumber);

router.route("/update-avatar/:hospitalID").patch(upload, updateHospitalAvatar);

router.route("/reset-token/").patch(requestTokenReset);

export default router;
