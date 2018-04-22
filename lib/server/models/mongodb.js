"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("../config");
exports.db = mongoose.connect(`mongodb://${config_1.dbHost}/${config_1.dbName}`, { user: config_1.dbUser,
    pass: config_1.dbPass });
//# sourceMappingURL=mongodb.js.map