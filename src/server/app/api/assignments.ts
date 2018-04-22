import { Request, Response, NextFunction } from "express";
import { User, Class, AssignmentData } from "../../models";
import { slice, assign } from "../util";

interface AssignmentLocals {
  class: Class;
  assignment: AssignmentData;
}

export async function readAssignments(req: Request, res: Response) {
  try {
    let locals = res.locals as AssignmentLocals;
    let klass = (await Class.findById(locals.class.id).populate("assignments")) as Class;
    res.json(klass.assignments);
  }
  catch (err) {
    console.log(err);
    res.status(500);
    res.json(err);
  }
}

export async function createAssignment(req: Request, res: Response) {
  try {
    let locals = res.locals as AssignmentLocals;
    let klass = (await Class.findById(locals.class.id).populate("assignments")) as Class;
    klass.assignments.push(slice(req.body, "title", "points", "due") as any)
    await klass.save();
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
    res.json(err)
  }
}

export async function lookupAssignment(req: Request, res: Response, next: NextFunction, id: string) {
  try {
    let locals = res.locals as AssignmentLocals;
    locals.class = (await Class.findById(locals.class.id).populate("assignments")) as Class;
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
}

export async function readOneAssignment(req: Request, res: Response) {
  res.json(res.locals.assignment);
}

export async function updateAssignment(req: Request, res: Response) {
  let locals = res.locals as AssignmentLocals;

  try {
    assign(locals.assignment as any, req.body, "title", "points", "due");
    await locals.class.save();
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
}

export async function removeAssignment(req: Request, res: Response) {
  try {
    res.locals.assignment.remove();
    await res.locals.class.save();
    res.json(res.locals.assignment);
  }
  catch (err) {
    console.error(err);
    res.status(500);
    res.json(err);
  }
}