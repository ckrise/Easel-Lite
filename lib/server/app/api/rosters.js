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
function readStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let locals = res.locals;
            let klass = (yield models_1.Class.findById(locals.class.id).populate("students", "firstname lastname role"));
            res.json(klass.students);
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
    });
}
exports.readStudents = readStudents;
function updateStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let locals = res.locals;
            let klass = yield models_1.Class.findById(locals.class.id);
            let userPromises = [];
            if (Array.isArray(req.body)) {
                for (let student of req.body) {
                    let id = student.id || student;
                    userPromises.push(models_1.User.findById(id, "firstname lastname role"));
                }
                let students = yield Promise.all(userPromises);
                console.log(students);
                if (students.some(user => user === null || user.role != 'student')) {
                    res.status(400);
                    res.json({ status: 400, message: "Roster must consist solely of students" });
                }
                else {
                    klass.students = students;
                    yield klass.save();
                    res.json(klass.students);
                }
            }
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
    });
}
exports.updateStudents = updateStudents;
function addStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let locals = res.locals;
            let klass = (yield models_1.Class.findById(locals.class.id).populate("students", "firstname lastname role"));
            if (!klass.students.find(s => s.toString() == locals.user.id.toString())) {
                klass.students.push(res.locals.user._id);
                yield klass.save();
            }
            yield klass.populate("students", "firstname lastname role").execPopulate();
            res.json(locals.class.students);
        }
        catch (err) {
            console.error(err);
            res.status(500);
            res.json(err);
        }
    });
}
exports.addStudent = addStudent;
function removeStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let locals = res.locals;
            let klass = (yield models_1.Class.findById(locals.class.id).populate("students", "firstname lastname role"));
            klass.students = klass.students.filter((s => s.id.toString() != locals.user.id.toString()));
            yield klass.save();
            res.json(locals.class.students);
        }
        catch (err) {
            console.error(err);
            res.status(500);
            res.json(err);
        }
    });
}
exports.removeStudent = removeStudent;
//# sourceMappingURL=rosters.js.map