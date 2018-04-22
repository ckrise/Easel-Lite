import { User, UserData  } from "./models/user";
import { Class } from "./models/class";

const userList = [
  {
    username:  "root",
    firstname: "Admin",
    lastname:  "User",
    role:      "admin"
  },
  {
    username:  "tbaird",
    firstname: "Tim",
    lastname:  "Baird",
    role:      "teacher"
  },
  {
    username:  "baber",
    firstname: "Steve",
    lastname:  "Baber",
    role:      "teacher"
  },
  {
    username:  "ragsdale",
    firstname: "Scott",
    lastname:  "Ragsdale",
    role:      "teacher"
  },
  {
    username:  "fmccown",
    firstname: "Frank",
    lastname:  "McCown",
    role:      "teacher"
  },
  {
    username:  "dsteil",
    firstname: "Dana",
    lastname:  "Steil",
    role:      "teacher"
  },
  {
    username:  "gfoust",
    firstname: "Gabriel",
    lastname:  "Foust",
    role:      "teacher"
  },
  {
    username:  "dcuneo",
    firstname: "Bryan",
    lastname:  "Cuneo",
    role:      "student"
  },
  {
    username:  "ddryden",
    firstname: "Isaac",
    lastname:  "Dryden",
    role:      "student"
  },
  {
    username:  "jfields4",
    firstname: "Jon-Michael",
    lastname:  "Fields",
    role:      "student"
  },
  {
    username:  "mgeorge1",
    firstname: "Maggie",
    lastname:  "George",
    role:      "student"
  },
  {
    username:  "dgillespie",
    firstname: "David",
    lastname:  "Gillespie",
    role:      "student"
  },
  {
    username:  "bgoff1",
    firstname: "Judah",
    lastname:  "Goff",
    role:      "student"
  },
  {
    username:  "mhaskins",
    firstname: "Madison",
    lastname:  "Haskins",
    role:      "student"
  },
  {
    username:  "bhudgins",
    firstname: "Brandy",
    lastname:  "Hudgins",
    role:      "student"
  },
  {
    username:  "vmiris",
    firstname: "Victor",
    lastname:  "Iris Del Prado",
    role:      "student"
  },
  {
    username:  "ckrise",
    firstname: "Caleb",
    lastname:  "Krise",
    role:      "student"
  },
  {
    username:  "arobison1",
    firstname: "Andrew",
    lastname:  "Robison",
    role:      "student"
  },
  {
    username:  "jshepherd",
    firstname: "Jerred",
    lastname:  "Shepherd",
    role:      "student"
  },
  {
    username:  "cspann1",
    firstname: "Caleb",
    lastname:  "Spann",
    role:      "student"
  },
  {
    username:  "nterrill",
    firstname: "Nicholas",
    lastname:  "Terrill",
    role:      "student"
  },
  {
    username:  "jtoye",
    firstname: "Joshua",
    lastname:  "Toye",
    role:      "student"
  },
  {
    username:  "jzuniga",
    firstname: "Jhoel",
    lastname:  "Zuniga",
    role:      "student"
  },
] as any[];

let classList = [
  {
    department: "COMP",
    number: 336,
    title: "Database",
    teacher: "tbaird",
    students: [
      "dcuneo",
      "mhaskins",
      "cspann1",
    ]
  },
  {
    department: "COMP",
    number: 268,
    title: "Computer Architecture",
    teacher: "baber",
    students: [
      "ddryden",
      "bhudgins",
      "nterrill",
    ]
  },
  {
    department: "COMP",
    number: 245,
    title: "Data Structures",
    teacher: "ragsdale",
    students: [
      "jfields4",
      "vmiris",
      "jtoye",
    ]
  },
  {
    department: "COMP",
    number: 250,
    title: "Web Development I",
    teacher: "fmccown",
    students: [
      "mgeorge1",
      "ckrise",
      "jzuniga",
    ]
  },
  {
    department: "COMP",
    number: 345,
    title: "Object-Oriented Programming",
    teacher: "dsteil",
    students: [
      "dgillespie",
      "arobison1",
    ]
  },
  {
    department: "COMP",
    number: 431,
    title: "Web Development II",
    teacher: "gfoust",
    students: [
      "bgoff1",
      "jshepherd",
    ]
  },
] as any[];

async function initdb() {
  try {
    let oldClasses = await Class.find();
    await Promise.all(oldClasses.map(clas => clas.remove()));

    let oldUsers = await User.find();
    await Promise.all(oldUsers.map(user => user.remove()));

    let users: {[username: string]: User} = { };
    let userPromises: Promise<User>[] = [ ];
    for (let userData of userList) {
      let user = new User(userData);
      user.email = user.username + '@harding.edu';
      await user.initPassword(user.username);
      userPromises.push(
        user.save().then(user => users[user.username] = user)
      );
    }
    await Promise.all(userPromises);

    let classPromises: Promise<Class>[] = [ ];
    for (let classData of classList) {
      classData.teacher = users[classData.teacher];
      classData.students = classData.students.map(name => users[name].id);
      classPromises.push(
        new Class(classData).save()
      );
    }
    await Promise.all(classPromises);

    console.log("done");
  }
  catch (err) {
    console.log(err);
  }
}

initdb().then(() => process.exit);
