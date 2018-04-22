import { Request, Response, NextFunction } from "express";
import * as basicAuth from "basic-auth";
import { User } from "../models";

export async function requireUser(req: Request, res: Response, next: NextFunction) {
  let auth = basicAuth(req);

  if (auth) {
    let user = await User.findOne({ username: auth.name });
    if (user && user.passwordMatches(auth.pass)) {
      res.locals.login = user;
      next();
      return;
    }
  }
  res.status(401);
  res.set("WWW-Authenticate", 'Basic realm="REST services"');
  res.json({ message: "Authentication required" });
}

export function requireRole(...roles: string[]) {
  return async function(req: Request, res: Response, next: NextFunction) {
    let user = res.locals.login as User;
    if (user && roles.indexOf(user.role) >= 0) {
      next();
    }
    else {
      res.status(403);
      res.json({ message: "User not authorized" });
    }
  }
}