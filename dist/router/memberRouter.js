"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberController_1 = require("../controller/memberController");
const multer_1 = __importDefault(require("multer"));
const validator_1 = __importDefault(require("../utils/validator"));
const userValidator_1 = require("../utils/userValidator");
const upload = (0, multer_1.default)().single("avatar");
const router = (0, express_1.Router)();
router
    .route("/add-member/:userID")
    .post((0, validator_1.default)(userValidator_1.registerMember), memberController_1.createMember);
router.route("/view-member/:userID").get(memberController_1.viewMyMembers);
router.route("/login-member/:userID").post(memberController_1.loginMembers);
router.route("/view-member-detail/:memberID").get(memberController_1.viewMyMemberDetail);
router.route("/member-avatar/:memberID").patch(upload, memberController_1.updateMemberAvatar);
router.route("/member-phone/:memberID").patch(memberController_1.updateMemberPhoneNumber);
router.route("/member-name/:memberID").patch(memberController_1.updateMemberNames);
exports.default = router;
