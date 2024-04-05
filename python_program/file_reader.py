import csv
import io

def process_csv(path):
    cleaned_lines = []

    with open(path, 'r', encoding='utf-8', errors='ignore') as file:
        for line in file:
            cleaned_line = line.rstrip().rstrip(',') + '\n'
            cleaned_lines.append(cleaned_line)

    data = []
    content = csv.reader(io.StringIO(''.join(cleaned_lines)), delimiter=';')
    for r in content:
        data.append(r)

    data.pop(0)
    
    return data
