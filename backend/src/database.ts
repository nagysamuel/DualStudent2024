import { Database } from 'sqlite3';

// Open a SQLite database, stored in the file db.sqlite3
const db = new Database('db.sqlite3', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
        process.exit(1); // Exit the application with a failure code
    }
});

function getCustomers(): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      db.all("select * from customer", (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  

export { getCustomers };
