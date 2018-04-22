import * as crypto from "crypto";
import * as util from "util";
import * as mongoose from "mongoose";
import "./mongodb";

const pbkdf2P = util.promisify(crypto.pbkdf2);

export interface UserData {
  id?: any;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "teacher" | "student";
}

export interface User extends UserData,  mongoose.Document {
  salt: string;
  password: string;
  initPassword(password: string): void;
  updatePassword(password: string): void;
  passwordMatches(password: string): Promise<boolean>;
  validatePassword(password: string): void;
}

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

UserSchema.methods.initPassword = async function(this: User, password: string) {
  let salt = crypto.randomBytes(64);
  this.salt = salt.toString("base64");
  if (this.validatePassword(password)) {
    let encBuffer = await pbkdf2P(password, salt, 10000, 256, "sha512");
    this.password = encBuffer.toString("base64");
  }
}

UserSchema.methods.updatePassword = async function(this: User, password: string) {
  if (this.validatePassword(password)) {
    let salt = new Buffer(this.salt, "base64");
    let encBuffer = await pbkdf2P(password, salt, 10000, 256, "sha512");
    this.password = encBuffer.toString("base64");
  }
}

UserSchema.methods.passwordMatches = async function(this: User, password: string): Promise<boolean> {
  let salt = new Buffer(this.salt, "base64");
  let encBuffer = await pbkdf2P(password, salt, 10000, 256, "sha512");
  return this.password == encBuffer.toString("base64");
}

UserSchema.methods.validatePassword = function(password: string): boolean {
  let valid = false;
  if (typeof password !== "string") {
    this.invalidate("password", "Path `password` is required");
  }
  // else if (password.length < 8) {
  //   this.invalidate("password", "Path `password` must be at least 8 characters");
  // }
  // else if (!password.match(/[a-z]/)) {
  //   this.invalidate("password", "Path `password` must contain a lowercase letter");
  // }
  // else if (!password.match(/[A-Z]/)) {
  //   this.invalidate("password", "Path `password` must contain an uppercase letter");
  // }
  // else if (!password.match(/[0-9]/)) {
  //   this.invalidate("password", "Path `password` must contain a digit");
  // }
  else {
    valid = true;
  }
  return valid;
}


export const User = mongoose.model<User>("User", UserSchema);

