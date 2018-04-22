import * as mongoose from "mongoose";
import { User, UserData } from "./user";
import "./mongodb";

function twoDaysFromNow(): Date {
  return new Date(Date.now() + 2*24*60*60*1000);
}

export interface AssignmentData {
  title: string;
  points: number;
  due: Date;
}

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200
  },
  points: {
    type: Number,
    min: 0,
    default: 100
  },
  due: {
    type: Date,
    default: twoDaysFromNow()
  }
}, {
  toJSON: {
    getters: false,
    virtuals: false,
    transform: (doc, obj, options) => {
      delete obj._id;
      delete obj.__v;
      obj.due = doc.due.toLocaleString();
      return obj;
    }
  },
});

export interface ClassData {
  id?: any;
  department: string;
  number: number;
  title: string;
  teacher: UserData;
  students: UserData[];
  assignments: AssignmentData[];
}

export interface Class extends ClassData, mongoose.Document { }

const ClassSchema = new mongoose.Schema({
  department: {
    type: String,
    uppercase: true,
    minlength: 4,
    maxlength: 4,
    required: true
  },
  number: {
    type: Number,
    min: 0,
    max: 499,
    validate: {
      validator: (value: number) => value == Math.floor(value),
      message: "{VALUE} is not an integer"
    },
    required: true
  },
  title: {
    type: String,
    trim: true,
    maxlength: 200,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: (id: mongoose.Schema.Types.ObjectId) =>
        User.findById(id).then(u => u !== null && u.role == "teacher") as any,
      message: "${VALUE} is not a valid teacher id"
    }
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  assignments: [AssignmentSchema]
}, {
  toJSON: {
    getters: false,
    virtuals: false,
    transform: (doc, obj, options) => {
      obj.id = obj._id;
      delete obj._id;
      delete obj.__v;
      return obj;
    }
  },
})

ClassSchema.index({ department: 1, number: 1 }, { unique: true });

export const Class = mongoose.model<Class>("Class", ClassSchema);