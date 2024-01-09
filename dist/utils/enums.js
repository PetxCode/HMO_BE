"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationshipValues = exports.HTTP = void 0;
var HTTP;
(function (HTTP) {
    HTTP[HTTP["OK"] = 200] = "OK";
    HTTP[HTTP["CREATED"] = 201] = "CREATED";
    HTTP[HTTP["BAD_REQUEST"] = 404] = "BAD_REQUEST";
})(HTTP || (exports.HTTP = HTTP = {}));
var relationshipValues;
(function (relationshipValues) {
    relationshipValues["HUSBAND"] = "husband";
    relationshipValues["WIFE"] = "wife";
    relationshipValues["CHILD"] = "child";
})(relationshipValues || (exports.relationshipValues = relationshipValues = {}));
