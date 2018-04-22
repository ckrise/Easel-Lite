import { Request, Response, NextFunction } from "express";

export interface Dictionary<T> {
  [key: string]: T | undefined;
}

export function forceDirectory(req: Request, res: Response, next: NextFunction) {
  if (req.path == "/") {
    if (req.originalUrl.startsWith(req.baseUrl + "/")) {
      res.redirect(307, req.baseUrl + req.url);
    }
    else {
      next();
    }
  }
  else {
    if (! req.path.endsWith("/")) {
      res.redirect(307, req.baseUrl + req.url.replace(req.path, req.path + "/"));
    }
    else {
      next();
    }
  }
}

export function slice<T>(obj: Dictionary<T>, ...props: string[]): Dictionary<T> {
  let result: Dictionary<T> = { };
  for (let prop of props) {
    if (prop in obj) {
      result[prop] = obj[prop];
    }
  }
  return result;
}

export function assign<T>(target: Dictionary<T>, source: Dictionary<T>, ...props: string[]) {
  for (let prop of props) {
    if (prop in source) {
      target[prop] = source[prop];
    }
  }
}