import { Router } from "express";
import {
  creatUserPayment,
  viewUserPayment,
} from "../controller/paymentController";

const router: Router = Router();

router.route("/create-user-payment/:userID").post(creatUserPayment);

router.route("/view-user-payment/:userID").get(viewUserPayment);

export default router;
