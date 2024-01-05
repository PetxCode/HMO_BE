import { Router } from "express";
import {
  createMember,
  loginMembers,
  viewMyMembers,
} from "../controller/memberController";

const router: Router = Router();

router.route("/create-member/:userID").post(createMember);
router.route("/view-member/:userID").get(viewMyMembers);
router.route("/login-member/:userID").post(loginMembers);

export default router;
