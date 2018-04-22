import * as mongoose from "mongoose";
import { dbHost, dbName, dbUser, dbPass } from "../config";

export const db = mongoose.connect(`mongodb://${dbHost}/${dbName}`,
                          { user: dbUser,
                            pass: dbPass });
