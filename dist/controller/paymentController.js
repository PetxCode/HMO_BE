"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewUserPayment = exports.creatUserPayment = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = require("mongoose");
const paymentsModel_1 = __importDefault(require("../model/paymentsModel"));
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
const creatUserPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        let defaultCost = 2000;
        let mainCost = user.members.length + 1;
        let myPlan;
        if (user.members.length === 1) {
            myPlan = "You Plan";
        }
        else if (user.members.length > 1) {
            myPlan = "Family Plan";
        }
        if (user) {
            const paymentReferenceID = crypto_1.default.randomBytes(5).toString("hex");
            const dateStart = new Date();
            const started = dateStart.getTime();
            const dateEnded = dateStart.setFullYear(dateStart.getFullYear() + 1);
            const millisecondsInSecond = 1000;
            const secondsInMinute = 60;
            const minutesInHour = 60;
            const hoursInDay = 24;
            const daysInYear = 365;
            const millisecondsInYear = millisecondsInSecond *
                secondsInMinute *
                minutesInHour *
                hoursInDay *
                daysInYear;
            const sixHour = millisecondsInSecond * secondsInMinute * minutesInHour * 6;
            const payment = yield paymentsModel_1.default.create({
                startDate: (0, moment_1.default)(started).format("LLLL"),
                endDate: (0, moment_1.default)(dateEnded).format("LLLL"),
                paymentReferenceID,
                userID,
                cost: defaultCost * mainCost * 12,
                subscriptionPlan: myPlan,
            });
            user.payments.push(new mongoose_1.Types.ObjectId(payment._id));
            user.save();
            yield userModel_1.default.findByIdAndUpdate(userID, { plan: "active" }, { new: true });
            const timer = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                yield userModel_1.default.findByIdAndUpdate(userID, { plan: "expires" }, { new: true });
                clearTimeout(timer);
            }), sixHour);
            return res.status(200).json({
                message: "payment made",
                data: payment,
            });
        }
        else {
            return res.status(404).json({
                message: "Error finding user",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error establishing user's payment",
            data: error.message,
        });
    }
});
exports.creatUserPayment = creatUserPayment;
const viewUserPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const getUser = yield userModel_1.default.findById(userID).populate({
            path: "payments",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res.status(200).json({
            message: "reading user payment history",
            data: getUser,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error reading user's payment history",
            data: error,
        });
    }
});
exports.viewUserPayment = viewUserPayment;
