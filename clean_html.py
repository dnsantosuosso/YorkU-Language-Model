import os
from bs4 import BeautifulSoup

#Make a copy of this folder before running, as it will delete HTML files

def clean_html():
    # Walk through the current directory
    for subdir, dirs, files in os.walk("."):
        for file in files:
            # Check if the file is an HTML file
            if file.endswith('.html'):
                file_path = os.path.join(subdir, file)
                # Open and read the file
                with open(file_path, 'r', encoding='utf-8') as f:
                    contents = f.read()
                # Use BeautifulSoup to parse and clean the HTML
                soup = BeautifulSoup(contents, 'html.parser')
                # Remove all script and style elements
                for script_or_style in soup(["script", "style", "noscript", "iframe"]):
                    script_or_style.decompose()
                # Get text
                clean_text = soup.get_text(separator=' ', strip=True)
                # Write the clean text to a new file with the same name but with a .txt extension
                new_file_path = file_path.replace('.html', '.txt')
                with open(new_file_path, 'w', encoding='utf-8') as f:
                    f.write(clean_text)
                # Remove the original HTML file
                os.remove(file_path)

# Run the cleaning function in the current directorys
ans = input("The HTML files will be deleted. It is good practice to have a copy of this entire folder. Are you sure you want to clean the data? Yes [Y] - No [N]?: ")

if (ans == 'Y' |  ans == 'y'):
    clean_html()
    print("Data was cleaned up successfully.")

