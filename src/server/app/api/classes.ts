import { Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import { Class } from "../../models/class";
import { User } from "../../models/user";
import { slice, assign } from "../util";

interface ClassLocals {
  class: Class;
}

export async function readClasses(req: Request, res: Response) {
   let classes = await Class.find({ }, "-assignments -students").populate("teacher", "firstname lastname");
   res.json(classes);
}

export async function createClass(req: Request, res: Response) {
  try {
    let klass = new Class(slice(req.body, "department", "number", "title"));
    if (req.body.teacher) {
      if (req.body.teacher.match(/^[0-9a-fA-F]{24}$/)) {
        klass.teacher = await User.findById(req.body.teacher, "firstname lastname") as User;
      }
      else {
        klass.teacher = await User.findOne({ username: req.body.teacher }, "firstname lastname") as User;
      }
    }
    await klass.save();
    res.json(klass);
  }
  catch (err) {
    if (err.name == "ValidationError" || err.code == 11000) {
      res.status(400);
    }
    else {
      res.status(500);
    }
    res.json(err)
  }
}

export async function lookupClass(req: Request, res: Response, next: NextFunction, id: string) {
  let locals = res.locals as ClassLocals;

  let klass: Class | null | undefined;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      klass = await Class.findById(id, "-students -assignments");
    }
    if (!klass) {
      let match = id.match(/^([A-Za-z]{3,5})(\d{2,4})$/);
      if (match) {
        klass = await Class.findOne({ department: match[1].toUpperCase(), number: Number(match[2]) }, "-students -assignments");
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
}

export async function readOneClass(req: Request, res: Response) {
  let locals = res.locals as ClassLocals;
  try {
    await locals.class.populate("teacher", "firstName lastName").execPopulate();
    res.json(locals.class);
  }
  catch (err) {
    res.status(500);
    res.json(err);
  }
}

export async function updateClass(req: Request, res: Response) {
  let locals = res.locals as ClassLocals;

  try {
    assign(locals.class as any, req.body, "department", "number", "title", "teacher");
    await locals.class.save();
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
}

export async function removeClass(req: Request, res: Response) {
  let locals = res.locals as ClassLocals;

  try {
    await locals.class.remove();
    res.json(locals.class);
  }
  catch (err) {
    res.status(500);
    res.json(err);
  }

}