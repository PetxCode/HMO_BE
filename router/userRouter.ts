import { Router } from "express";
import {
  createUser,
  requestTokenReset,
  signUser,
  updateUserAvatar,
  updateUserLocation,
  updateUserNames,
  updateUserPhoneNumber,
  verifiedUser,
} from "../controller/userController";
// import { upload } from "../utils/multer";
import multer from "multer";

import validator from "../utils/validator";
import { registerValidator } from "../utils/userValidator";
const upload = multer().single("avatar");

const router: Router = Router();

router.route("/register-user").post(validator(registerValidator), createUser);
router.route("/verify-user/:userID").get(verifiedUser);
router.route("/sign-in-user").post(signUser);

router.route("/update-user-name/:userID").patch(updateUserNames);
router.route("/update-user-location/:userID").patch(updateUserLocation);
router.route("/update-user-phone/:userID").patch(updateUserPhoneNumber);

router.route("/update-avatar/:userID").patch(upload, updateUserAvatar);
router.route("/reset-token/").patch(requestTokenReset);

export default router;
