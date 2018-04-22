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
const user_1 = require("../../models/user");
const util_1 = require("../util");
function validationMessages(validation) {
    let messages = [];
    for (let path in validation.errors) {
        messages.push(validation.errors[path].message);
    }
    return messages;
}
function readUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let users = yield user_1.User.find(util_1.slice(req.query, "role", "firstname", "lastname"));
            res.json(users);
        }
        catch (err) {
            console.error(err);
            res.status(500);
            res.json(err);
        }
    });
}
exports.readUsers = readUsers;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = new user_1.User(util_1.slice(req.body, "username", "firstname", "lastname", "email", "role"));
            yield user.initPassword(req.body.password);
            yield user.save();
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
                res.json(err);
            }
        }
    });
}
exports.createUser = createUser;
function lookupUser(req, res, next, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let locals = res.locals;
        let user;
        try {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                user = yield user_1.User.findById(id);
            }
            if (!user) {
                user = yield user_1.User.findOne({ username: id });
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
    });
}
exports.lookupUser = lookupUser;
function readOneUser(req, res) {
    res.json(res.locals.user);
}
exports.readOneUser = readOneUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let locals = res.locals;
        try {
            util_1.assign(locals.user, req.body, "username", "firstname", "lastname", "email", "role");
            if ("password" in req.body) {
                yield locals.user.updatePassword(req.body.password);
            }
            yield locals.user.save();
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
    });
}
exports.updateUser = updateUser;
function removeUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let locals = res.locals;
        try {
            yield locals.user.remove();
            res.json(locals.user);
        }
        catch (err) {
            console.error(err);
            res.status(500);
            res.json(err);
        }
    });
}
exports.removeUser = removeUser;
//# sourceMappingURL=users.js.map