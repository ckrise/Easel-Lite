import * as express from "express";
import * as users from "./users";
import * as classes from "./classes";
import * as rosters from "./rosters";
import * as assignments from "./assignments";
import { requireUser, requireRole } from "../auth";
import { forceDirectory } from "../util";

export const router = express.Router();

router.use(requireUser);

router.param("userId", users.lookupUser);
router.param("classId", classes.lookupClass);
router.param("assignmentId", assignments.lookupAssignment);

router.get("/users/", forceDirectory, requireRole("admin", "teacher"), users.readUsers);
router.get("/users/:userId", requireRole("admin", "teacher"), users.readOneUser);
router.post("/users/", forceDirectory, requireRole("admin"), users.createUser);
router.put("/users/:userId", requireRole("admin"), users.updateUser);
router.delete("/users/:userId", requireRole("admin"), users.removeUser);

router.get("/classes/", forceDirectory, classes.readClasses);
router.get("/classes/:classId", classes.readOneClass);
router.post("/classes/", forceDirectory, requireRole("admin", "teacher"), classes.createClass);
router.put("/classes/:classId", requireRole("admin", "teacher"), classes.updateClass);
router.delete("/classes/:classId", requireRole("admin", "teacher"), classes.removeClass);

router.get("/rosters/:classId/", forceDirectory, requireRole("admin", "teacher"), rosters.readStudents);
router.put("/rosters/:classId/", forceDirectory, requireRole("admin", "teacher"), rosters.updateStudents);
router.put("/rosters/:classId/:userId", requireRole("admin", "teacher"), rosters.addStudent);
router.delete("/rosters/:classId/:userId", requireRole("admin", "teacher"), rosters.removeStudent);

router.get("/assignments/:classId/", forceDirectory, assignments.readAssignments);
router.get("/assignments/:classId/:assignmentId", assignments.readOneAssignment);
router.post("/assignments/:classId/", forceDirectory, requireRole("admin", "teacher"), assignments.createAssignment);
router.put("/assignments/:classId/:assignmentId", requireRole("admin", "teacher"), assignments.updateAssignment);
router.delete("/assignments/:classId/:assignmentId", requireRole("admin", "teacher"), assignments.removeAssignment);

router.use((req, res, next) => {
  if (req.path == "/") {
    next();
  }
  else {
    res.status(405);
    res.json({ message: `${req.method} method not supported for ${req.originalUrl}` });
  }
})