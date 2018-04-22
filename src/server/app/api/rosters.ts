import { Request, Response, NextFunction } from "express";
import { User, Class } from "../../models";

interface StudentLocals {
  class: Class;
  user: User;
}

export async function readStudents(req: Request, res: Response) {
  try {
    let locals = res.locals as StudentLocals;
    let klass = (await Class.findById(locals.class.id).populate("students", "firstname lastname role")) as Class;
    res.json(klass.students);
  }
  catch (err) {
    res.status(500);
    res.json(err);
  }
}

export async function updateStudents(req: Request, res: Response) {
  try {
    let locals = res.locals as StudentLocals;
    let klass = await Class.findById(locals.class.id);
    let userPromises: PromiseLike<User>[] = [ ];
    if (Array.isArray(req.body)) {
      for (let student of req.body) {
        let id = student.id || student;
        userPromises.push(User.findById(id, "firstname lastname role"));
      }
      let students = await Promise.all(userPromises);
      console.log(students);
      if (students.some(user => user === null || user.role != 'student')) {
        res.status(400);
        res.json({ status: 400, message: "Roster must consist solely of students"});
      }
      else {
        klass.students = students;
        await klass.save();
        res.json(klass.students);
      }
    }
  }
  catch (err) {
    res.status(500);
    res.json(err);
  }
}

export async function addStudent(req: Request, res: Response) {
  try {
    let locals = res.locals as StudentLocals;
    let klass = (await Class.findById(locals.class.id).populate("students", "firstname lastname role")) as Class;
    if (!klass.students.find(s => s.toString() == locals.user.id.toString())) {
      klass.students.push(res.locals.user._id);
      await klass.save();
    }
    await klass.populate("students", "firstname lastname role").execPopulate();
    res.json(locals.class.students);
  }
  catch (err) {
    console.error(err);
    res.status(500);
    res.json(err);
  }
}

export async function removeStudent(req: Request, res: Response) {
  try {
    let locals = res.locals as StudentLocals;
    let klass = (await Class.findById(locals.class.id).populate("students", "firstname lastname role")) as Class;
    klass.students = klass.students.filter(
      (s => s.id.toString() != locals.user.id.toString())
    );
    await klass.save();
    res.json(locals.class.students);
  }
  catch (err) {
    console.error(err);
    res.status(500);
    res.json(err);
  }
}