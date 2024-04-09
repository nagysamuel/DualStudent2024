import csv
import io

def process_csv(path):
    try:
        cleaned_lines = []

        with open(path, 'r', encoding='utf-8', errors='ignore') as file:
            for line in file:
                # Remove trailing newlines and commas, then add newline back
                cleaned_line = line.rstrip().rstrip(',') + '\n'
                cleaned_lines.append(cleaned_line)

        # Convert cleaned lines back into a CSV format for parsing
        data = []

        content = csv.reader(io.StringIO(''.join(cleaned_lines)), delimiter=';')
        for r in content:
            data.append(r)

        # Remove headers
        if data:
            data.pop(0)
        
        return data

    except csv.Error as e:
        print(f"Error processing CSV file: {e}")
    except IOError as e:
        print(f"Error reading file: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    
    return []
