import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import { slice, assign } from "../util";
import * as mongoose from "mongoose";

interface UserLocals {
  user: User;
}

function validationMessages(validation: any) {
    let messages: string[] = [ ];
    for (let path in validation.errors) {
      messages.push(validation.errors[path].message)
    }
    return messages;
}

export async function readUsers(req: Request, res: Response) {
  try {
    let users = await User.find(slice(req.query, "role", "firstname", "lastname"));
    res.json(users);
  }
  catch (err) {
    console.error(err);
    res.status(500);
    res.json(err);
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    let user = new User(slice(req.body, "username", "firstname", "lastname", "email", "role"));
    await user.initPassword(req.body.password);
    await user.save();
    res.json(user);
  }
  catch (err) {
    if (err.name == "ValidationError" || err.code == 11000) {
      res.status(400);
      res.json({ message: "ValidationError", errors: validationMessages(err) });
    }
    else {
      console.error(err);
      res.status(500);
      res.json(err)
    }
  }
}

export async function lookupUser(req: Request, res: Response, next: NextFunction, id: string) {
  let locals = res.locals as UserLocals;

  let user: User | null | undefined;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(id);
    }
    if (!user) {
      user = await User.findOne({ username: id });
    }
  }
  catch (err) {
    console.error(err);
    res.status(500);
    res.json(err);
  }

  if (user) {
    locals.user = user;
    next();
  }
  else {
    res.status(404);
    res.json({ message: "User not found" });
  }
}

export function readOneUser(req: Request, res: Response) {
  res.json(res.locals.user);
}

export async function updateUser(req: Request, res: Response) {
  let locals = res.locals as UserLocals;

  try {
    assign(locals.user as any, req.body, "username", "firstname", "lastname", "email", "role");
    if ("password" in req.body) {
      await locals.user.updatePassword(req.body.password);
    }
    await locals.user.save();
    res.json(locals.user);
  }
  catch (err) {
    if (err.name == "ValidationError" || err.code == 11000) {
      res.status(400);
      res.json({ message: "ValidationError", errors: validationMessages(err) });
    }
    else {
      console.error(err);
      res.status(500);
      res.json(err);
    }
  }
}

export async function removeUser(req: Request, res: Response) {
  let locals = res.locals as UserLocals;

  try {
    await locals.user.remove();
    res.json(locals.user);
  }
  catch (err) {
    console.error(err);
    res.status(500);
    res.json(err);
  }

}