import express           = require("express");
import expressHandlebars = require("express-handlebars");
import morgan            = require("morgan");
import bodyParser        = require("body-parser");
import expressSession    = require("express-session");
import sessionFileStore  = require("session-file-store");
import * as config from "../config";
import * as helpers from "./helpers";
import * as api from "./api";

export const app = express();

// Configure handlebars engine
app.engine("hb", expressHandlebars({
  extname: ".hb",
  partialsDir: "src/server/views/partials",
  helpers: helpers,
}));
app.set("views", "src/server/views");
app.set("view engine", "hb");

// Logging
if (config.logFormat) {
  app.use(morgan(config.logFormat));
}

// POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session
const FileStore = sessionFileStore(expressSession);
app.use(expressSession({
  secret: config.sessionSecret,
  store: new FileStore,
  saveUninitialized: false,
  resave: false,
}));


// Custom Middleware
app.use("/api/", api.router);
app.use("/el/", express.static("./dist"));
app.use("/el/", (req, res) => {
  res.sendFile(process.cwd() + "/dist/index.html");
})


// Static files
app.use(express.static("./public"));

// Last resort
// app.use((req, res) => {
//   res.status(404);
//   res.render("error404", req);
// });
