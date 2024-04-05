"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomers = void 0;
const sqlite3_1 = require("sqlite3");
// Open a SQLite database, stored in the file db.sqlite
const db = new sqlite3_1.Database('db.sqlite3');
function executeCall(query, callback) {
    db.all(query, (_, result) => callback(result));
}
function getCustomers(callback) {
    executeCall("select * from customer", callback);
}
exports.getCustomers = getCustomers;
