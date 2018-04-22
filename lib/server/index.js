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
const config_1 = require("./config");
const user_1 = require("./models/user");
const app_1 = require("./app");
function createRootUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield user_1.User.findOne({ username: "root" });
            if (!user) {
                user = new user_1.User({
                    username: "root",
                    firstname: "Admin",
                    lastname: "User",
                    email: "gfoust@harding.edu",
                    role: "admin"
                });
                yield user.initPassword("likeaboss");
                yield user.save();
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
createRootUser();
console.log(`Listening on port ${config_1.serverPort}`);
app_1.app.listen(config_1.serverPort);
//# sourceMappingURL=index.js.map