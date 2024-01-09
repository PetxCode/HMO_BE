"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const userRouter_1 = __importDefault(require("./router/userRouter"));
const memberRouter_1 = __importDefault(require("./router/memberRouter"));
const hospitalRoute_1 = __importDefault(require("./router/hospitalRoute"));
const appoinmentRouter_1 = __importDefault(require("./router/appoinmentRouter"));
const doctorRouter_1 = __importDefault(require("./router/doctorRouter"));
const enums_1 = require("./utils/enums");
const mianError_1 = require("./error/mianError");
const handleError_1 = require("./error/handleError");
const mainApp = (app) => {
    try {
        app.use("/api", userRouter_1.default);
        app.use("/api", memberRouter_1.default);
        app.use("/api", hospitalRoute_1.default);
        app.use("/api", doctorRouter_1.default);
        app.use("/api", appoinmentRouter_1.default);
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "HMO API",
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "Error loading",
                });
            }
        });
        app.all("*", (req, res, next) => {
            next(new mianError_1.mainError({
                name: `Route Error`,
                message: `Route Error: because the page, ${req.originalUrl} doesn't exist`,
                status: enums_1.HTTP.BAD_REQUEST,
                success: false,
            }));
        });
        app.use(handleError_1.handleError);
    }
    catch (error) {
        return error;
    }
};
exports.mainApp = mainApp;
