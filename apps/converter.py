import os

folder_path = "components"
file_extension = ".svg"
svg_files = []

for filename in os.listdir(folder_path):
    if filename.endswith(file_extension):
        name = os.path.splitext(filename)[0].replace("_", " ").replace("-", " ")
        url = os.path.join(folder_path, filename).replace("\\", "/")
        keywords = name.lower().split()
        svg_files.append({"name": name, "url": url, "keywords": keywords})

js_output = "const svgFiles = " + str(svg_files) + ";"
with open("output.js", "w") as output_file:
    output_file.write(js_output)
