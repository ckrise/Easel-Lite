"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const users = require("./users");
const classes = require("./classes");
const rosters = require("./rosters");
const assignments = require("./assignments");
const auth_1 = require("../auth");
const util_1 = require("../util");
exports.router = express.Router();
exports.router.use(auth_1.requireUser);
exports.router.param("userId", users.lookupUser);
exports.router.param("classId", classes.lookupClass);
exports.router.param("assignmentId", assignments.lookupAssignment);
exports.router.get("/users/", util_1.forceDirectory, auth_1.requireRole("admin", "teacher"), users.readUsers);
exports.router.get("/users/:userId", auth_1.requireRole("admin", "teacher"), users.readOneUser);
exports.router.post("/users/", util_1.forceDirectory, auth_1.requireRole("admin"), users.createUser);
exports.router.put("/users/:userId", auth_1.requireRole("admin"), users.updateUser);
exports.router.delete("/users/:userId", auth_1.requireRole("admin"), users.removeUser);
exports.router.get("/classes/", util_1.forceDirectory, classes.readClasses);
exports.router.get("/classes/:classId", classes.readOneClass);
exports.router.post("/classes/", util_1.forceDirectory, auth_1.requireRole("admin", "teacher"), classes.createClass);
exports.router.put("/classes/:classId", auth_1.requireRole("admin", "teacher"), classes.updateClass);
exports.router.delete("/classes/:classId", auth_1.requireRole("admin", "teacher"), classes.removeClass);
exports.router.get("/rosters/:classId/", util_1.forceDirectory, auth_1.requireRole("admin", "teacher"), rosters.readStudents);
exports.router.put("/rosters/:classId/", util_1.forceDirectory, auth_1.requireRole("admin", "teacher"), rosters.updateStudents);
exports.router.put("/rosters/:classId/:userId", auth_1.requireRole("admin", "teacher"), rosters.addStudent);
exports.router.delete("/rosters/:classId/:userId", auth_1.requireRole("admin", "teacher"), rosters.removeStudent);
exports.router.get("/assignments/:classId/", util_1.forceDirectory, assignments.readAssignments);
exports.router.get("/assignments/:classId/:assignmentId", assignments.readOneAssignment);
exports.router.post("/assignments/:classId/", util_1.forceDirectory, auth_1.requireRole("admin", "teacher"), assignments.createAssignment);
exports.router.put("/assignments/:classId/:assignmentId", auth_1.requireRole("admin", "teacher"), assignments.updateAssignment);
exports.router.delete("/assignments/:classId/:assignmentId", auth_1.requireRole("admin", "teacher"), assignments.removeAssignment);
exports.router.use((req, res, next) => {
    if (req.path == "/") {
        next();
    }
    else {
        res.status(405);
        res.json({ message: `${req.method} method not supported for ${req.originalUrl}` });
    }
});
//# sourceMappingURL=routes.js.map