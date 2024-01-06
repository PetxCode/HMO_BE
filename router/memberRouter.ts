import { Router } from "express";
import {
  createMember,
  loginMembers,
  updateMemberAvatar,
  updateMemberNames,
  updateMemberPhoneNumber,
  viewMyMemberDetail,
  viewMyMembers,
} from "../controller/memberController";
import multer from "multer";
import validator from "../utils/validator";
import { registerMember } from "../utils/userValidator";
const upload = multer().single("avatar");

const router: Router = Router();

router
  .route("/add-member/:userID")
  .post(validator(registerMember), createMember);
router.route("/view-member/:userID").get(viewMyMembers);
router.route("/login-member/:userID").post(loginMembers);

router.route("/view-member-detail/:memberID").get(viewMyMemberDetail);
router.route("/member-avatar/:memberID").patch(upload, updateMemberAvatar);
router.route("/member-phone/:memberID").patch(updateMemberPhoneNumber);
router.route("/member-name/:memberID").patch(updateMemberNames);

export default router;
