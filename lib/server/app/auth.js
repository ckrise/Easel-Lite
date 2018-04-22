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
const basicAuth = require("basic-auth");
const models_1 = require("../models");
function requireUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let auth = basicAuth(req);
        if (auth) {
            let user = yield models_1.User.findOne({ username: auth.name });
            if (user && user.passwordMatches(auth.pass)) {
                res.locals.login = user;
                next();
                return;
            }
        }
        res.status(401);
        res.set("WWW-Authenticate", 'Basic realm="REST services"');
        res.json({ message: "Authentication required" });
    });
}
exports.requireUser = requireUser;
function requireRole(...roles) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = res.locals.login;
            if (user && roles.indexOf(user.role) >= 0) {
                next();
            }
            else {
                res.status(403);
                res.json({ message: "User not authorized" });
            }
        });
    };
}
exports.requireRole = requireRole;
//# sourceMappingURL=auth.js.map