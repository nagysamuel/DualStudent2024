# DualStudent2024

Introducing DualStudent2024, a collection of programs to convert CSV data into an easily accessible web-based table. This collection includes:

* A **Python Program** for converting CSV files into SQLite databases.
* A **Node.js Backend** to serve data from the SQLite database via HTTP requests.
* An **Angular Frontend** application to display data in a table format.

## Python Program

Begin by navigating to the directory containing `program.py` and run it with the command: `py program.py`. The program will prompt you for the location of your CSV file and the desired output location for the database file.

Ensure your CSV is formatted correctly to avoid any conversion issues.

## Backend

The backend operates by accessing the SQLite database to fulfill HTTP requests.

To set up, navigate to the backend directory and compile the project using `npm run build`. Then, start the backend with `npm start`.

The customer endpoint can be tested by visiting [http://localhost:3000/customer](http://localhost:3000/customer).

**Remember:** Place the `db.sqlite3` database file in the backend directory.

## Frontend

The frontend presents the backend's data in a user-friendly table.

To launch the frontend, which is built with Angular, move to the frontend directory and run `ng serve`.

Access the web interface by going to [http://localhost:4200](http://localhost:4200/).
