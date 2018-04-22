"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const util_1 = require("../util");
function readAssignments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let locals = res.locals;
            let klass = (yield models_1.Class.findById(locals.class.id).populate("assignments"));
            res.json(klass.assignments);
        }
        catch (err) {
            console.log(err);
            res.status(500);
            res.json(err);
        }
    });
}
exports.readAssignments = readAssignments;
function createAssignment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let locals = res.locals;
            let klass = (yield models_1.Class.findById(locals.class.id).populate("assignments"));
            klass.assignments.push(util_1.slice(req.body, "title", "points", "due"));
            yield klass.save();
            res.json(klass.assignments[klass.assignments.length - 1]);
        }
        catch (err) {
            if (err.name == "ValidationError" || err.code == 11000) {
                console.log(err);
                res.status(400);
            }
            else {
                console.log(err);
                res.status(500);
            }
            res.json(err);
        }
    });
}
exports.createAssignment = createAssignment;
function lookupAssignment(req, res, next, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let locals = res.locals;
            locals.class = (yield models_1.Class.findById(locals.class.id).populate("assignments"));
            let i = Number(id);
            if (Math.floor(i) == i && i >= 1 && i <= locals.class.assignments.length) {
                locals.assignment = locals.class.assignments[i - 1];
                next();
            }
            else {
                res.status(404);
                res.json({ message: "Assignment not found" });
            }
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
    });
}
exports.lookupAssignment = lookupAssignment;
function readOneAssignment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(res.locals.assignment);
    });
}
exports.readOneAssignment = readOneAssignment;
function updateAssignment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let locals = res.locals;
        try {
            util_1.assign(locals.assignment, req.body, "title", "points", "due");
            yield locals.class.save();
            res.json(locals.assignment);
        }
        catch (err) {
            if (err.name == "ValidationError" || err.code == 11000) {
                res.status(400);
            }
            else {
                console.error(err);
                res.status(500);
            }
            res.json(err);
        }
    });
}
exports.updateAssignment = updateAssignment;
function removeAssignment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.locals.assignment.remove();
            yield res.locals.class.save();
            res.json(res.locals.assignment);
        }
        catch (err) {
            console.error(err);
            res.status(500);
            res.json(err);
        }
    });
}
exports.removeAssignment = removeAssignment;
//# sourceMappingURL=assignments.js.map