"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainError = void 0;
class mainError extends Error {
    constructor(args) {
        super(args.message);
        this.success = false;
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = args.message;
        this.name = args.name;
        this.status = args.status;
        if (this.success !== undefined) {
            this.success = args.success;
        }
        Error.captureStackTrace;
    }
}
exports.mainError = mainError;
