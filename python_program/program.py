import csv
import sqlite3

import file_reader

# File paths for DB and CSV
db_file_path = input("Database file path: ")
csv_file_path = input("CSV file path: ")

# DB Connection
connection = sqlite3.connect(db_file_path)
cursor = connection.cursor()

# Table definition and for customer
table_def = '''create table customer (
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

# Processing the csv file
content = file_reader.process_csv(csv_file_path)

# Executing insert statements
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

cursor.execute('begin transaction;')
cursor.executemany(insert_def, content)

# select_all = "select * from customer"
# rows = cursor.execute(select_all).fetchall()

# for r in rows:
#     print(r)

# Commit and close
connection.commit()
connection.close()