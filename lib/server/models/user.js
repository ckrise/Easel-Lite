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
const crypto = require("crypto");
const util = require("util");
const mongoose = require("mongoose");
require("./mongodb");
const pbkdf2P = util.promisify(crypto.pbkdf2);
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        match: /^[a-zA-Z\d]([a-zA-Z\d]|[_-][a-zA-Z\d])+$/,
        unique: true
    },
    firstname: {
        type: String,
        trim: true,
        maxlength: 100,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        maxlength: 100,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100,
        match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "teacher", "student"]
    },
    salt: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        getters: false,
        virtuals: false,
        transform: (doc, obj, options) => {
            obj.id = obj._id;
            delete obj._id;
            delete obj.__v;
            delete obj.password;
            delete obj.salt;
            return obj;
        }
    }
});
UserSchema.methods.initPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        let salt = crypto.randomBytes(64);
        this.salt = salt.toString("base64");
        if (this.validatePassword(password)) {
            let encBuffer = yield pbkdf2P(password, salt, 10000, 256, "sha512");
            this.password = encBuffer.toString("base64");
        }
    });
};
UserSchema.methods.updatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.validatePassword(password)) {
            let salt = new Buffer(this.salt, "base64");
            let encBuffer = yield pbkdf2P(password, salt, 10000, 256, "sha512");
            this.password = encBuffer.toString("base64");
        }
    });
};
UserSchema.methods.passwordMatches = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        let salt = new Buffer(this.salt, "base64");
        let encBuffer = yield pbkdf2P(password, salt, 10000, 256, "sha512");
        return this.password == encBuffer.toString("base64");
    });
};
UserSchema.methods.validatePassword = function (password) {
    let valid = false;
    if (typeof password !== "string") {
        this.invalidate("password", "Path `password` is required");
    }
    else {
        valid = true;
    }
    return valid;
};
exports.User = mongoose.model("User", UserSchema);
//# sourceMappingURL=user.js.map