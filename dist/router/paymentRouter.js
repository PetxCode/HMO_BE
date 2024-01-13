"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controller/paymentController");
const router = (0, express_1.Router)();
router.route("/create-user-payment/:userID").post(paymentController_1.creatUserPayment);
router.route("/view-user-payment/:userID").get(paymentController_1.viewUserPayment);
exports.default = router;
