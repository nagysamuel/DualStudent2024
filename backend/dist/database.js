"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomers = void 0;
const sqlite3_1 = require("sqlite3");
// Open a SQLite database, stored in the file db.sqlite3
const db = new sqlite3_1.Database('db.sqlite3', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
        process.exit(1); // Exit the application with a failure code
    }
});
function getCustomers() {
    return new Promise((resolve, reject) => {
        db.all("select * from customer", (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    });
}
exports.getCustomers = getCustomers;
