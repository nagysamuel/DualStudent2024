import csv
import sqlite3

import file_reader

try:
    # File paths for DB and CSV from user input
    db_file_path = input("Database file path: ")
    csv_file_path = input("CSV file path: ")

    # DB Connection
    connection = sqlite3.connect(db_file_path)
    cursor = connection.cursor()

    # Table definition for customer
    table_def = '''create table if not exists customer (
                        idx text not null primary key,
                        customer_id text not null,
                        first_name text not null,
                        last_name text not null,
                        company text not null,
                        city text not null,
                        country text not null,
                        phone1 text not null,
                        phone2 text not null,
                        email text not null,
                        subscription_date text not null,
                        website text not null,
                        sales2021 text not null,
                        sales2022 text not null
                   );
                '''
    cursor.execute(table_def)

    # Processing the CSV file
    content = file_reader.process_csv(csv_file_path)

    # Preparing insert statement
    insert_def = '''insert into customer (
                    idx,
                    customer_id,
                    first_name,
                    last_name,
                    company,
                    city,
                    country,
                    phone1,
                    phone2,
                    email,
                    subscription_date,
                    website,
                    sales2021,
                    sales2022
                    )
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    '''
    
    # Executing insert statements within a transaction
    cursor.execute('begin transaction;')
    cursor.executemany(insert_def, content)
    
    # Committing transaction
    connection.commit()

except sqlite3.DatabaseError as e:
    print("Database error occurred:", e)
    if connection:
        connection.rollback()
except Exception as e:
    print("An error occurred:", e)
finally:
    if connection:
        connection.close()
