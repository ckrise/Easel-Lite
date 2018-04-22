import { serverPort } from "./config";
import { User } from "./models/user";
import { app } from "./app";

async function createRootUser() {
  try {
    let user = await User.findOne({ username: "root" });
    if (! user) {
      user = new User({
        username: "root",
        firstname: "Admin",
        lastname: "User",
        email: "gfoust@harding.edu",
        role: "admin"
      });
      await user.initPassword("likeaboss");
      await user.save();
    }
  }
  catch (err) {
    console.error(err);
  }
}

createRootUser();

console.log(`Listening on port ${serverPort}`);
app.listen(serverPort);
