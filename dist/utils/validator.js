"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
exports.default = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error === undefined) {
            next();
        }
        else {
            return res
                .status(enums_1.HTTP.BAD_REQUEST)
                .json({ error: error.details[0].message });
        }
    };
};
