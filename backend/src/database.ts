​import { Database } from 'sqlite3';

// Open a SQLite database, stored in the file db.sqlite
const db = new Database('db.sqlite3');

function executeCall(query: string, callback: (res: unknown[]) => void) {
    db.all(query, (_, result) => callback(result));
}

function getCustomers(callback: (res: unknown[]) => void) {
    executeCall("select * from customer", callback);
}


export {getCustomers}