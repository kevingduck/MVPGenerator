import os

def print_file_contents(file_paths):
    for file_path in file_paths:
        if os.path.exists(file_path):
            print(f"Contents of {file_path}:\n")
            
            with open(file_path, "r") as f:
                content = f.read()
                print(content)
            
            print("\n" + "="*50 + "\n")
        else:
            print(f"File not found: {file_path}")

if __name__ == "__main__":
    # Add the file paths you want to print in the list below
    files_to_print = [
        "app.py",
        "templates/app.html",
        # "templates/index.html",
        # "templates/waitlist.html",
        "static/index.js",
        "static/style.css",
    ]
    print_file_contents(files_to_print)
