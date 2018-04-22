"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const expressHandlebars = require("express-handlebars");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const sessionFileStore = require("session-file-store");
const config = require("../config");
const helpers = require("./helpers");
const api = require("./api");
exports.app = express();
// Configure handlebars engine
exports.app.engine("hb", expressHandlebars({
    extname: ".hb",
    partialsDir: "src/server/views/partials",
    helpers: helpers,
}));
exports.app.set("views", "src/server/views");
exports.app.set("view engine", "hb");
// Logging
if (config.logFormat) {
    exports.app.use(morgan(config.logFormat));
}
// POST data
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use(bodyParser.json());
// Session
const FileStore = sessionFileStore(expressSession);
exports.app.use(expressSession({
    secret: config.sessionSecret,
    store: new FileStore,
    saveUninitialized: false,
    resave: false,
}));
// Custom Middleware
exports.app.use("/api/", api.router);
exports.app.use("/el/", express.static("./dist"));
//app.use("/", function (req, res) { res.redirect('/el/')});
// Static files
exports.app.use(express.static("./public"));
// Last resort
// app.use((req, res) => {
//   res.status(404);
//   res.render("error404", req);
// });
//# sourceMappingURL=index.js.map