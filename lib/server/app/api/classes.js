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
const class_1 = require("../../models/class");
const user_1 = require("../../models/user");
const util_1 = require("../util");
function readClasses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let classes = yield class_1.Class.find({}, "-assignments -students").populate("teacher", "firstname lastname");
        res.json(classes);
    });
}
exports.readClasses = readClasses;
function createClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let klass = new class_1.Class(util_1.slice(req.body, "department", "number", "title"));
            if (req.body.teacher) {
                if (req.body.teacher.match(/^[0-9a-fA-F]{24}$/)) {
                    klass.teacher = (yield user_1.User.findById(req.body.teacher, "firstname lastname"));
                }
                else {
                    klass.teacher = (yield user_1.User.findOne({ username: req.body.teacher }, "firstname lastname"));
                }
            }
            yield klass.save();
            res.json(klass);
        }
        catch (err) {
            if (err.name == "ValidationError" || err.code == 11000) {
                res.status(400);
            }
            else {
                res.status(500);
            }
            res.json(err);
        }
    });
}
exports.createClass = createClass;
function lookupClass(req, res, next, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let locals = res.locals;
        let klass;
        try {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                klass = yield class_1.Class.findById(id, "-students -assignments");
            }
            if (!klass) {
                let match = id.match(/^([A-Za-z]{3,5})(\d{2,4})$/);
                if (match) {
                    klass = yield class_1.Class.findOne({ department: match[1].toUpperCase(), number: Number(match[2]) }, "-students -assignments");
                }
            }
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
        if (klass) {
            locals.class = klass;
            next();
        }
        else {
            res.status(404);
            res.json({ message: "Class not found" });
        }
    });
}
exports.lookupClass = lookupClass;
function readOneClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let locals = res.locals;
        try {
            yield locals.class.populate("teacher", "firstName lastName").execPopulate();
            res.json(locals.class);
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
    });
}
exports.readOneClass = readOneClass;
function updateClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let locals = res.locals;
        try {
            util_1.assign(locals.class, req.body, "department", "number", "title", "teacher");
            yield locals.class.save();
            res.json(locals.class);
        }
        catch (err) {
            if (err.name == "ValidationError" || err.code == 11000) {
                res.status(400);
            }
            else {
                res.status(500);
            }
            res.json(err);
        }
    });
}
exports.updateClass = updateClass;
function removeClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let locals = res.locals;
        try {
            yield locals.class.remove();
            res.json(locals.class);
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
    });
}
exports.removeClass = removeClass;
//# sourceMappingURL=classes.js.map