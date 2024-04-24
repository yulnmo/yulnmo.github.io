import os, sys
from PIL import Image

if (len(sys.argv) < 2):
	basePath = "./"
else:
	basePath = sys.argv[1].strip()

with os.scandir(basePath) as it:
	for entry in it:
		if ("-resize" not in entry.name and any(entry.name.lower().endswith(x) for x in [".jpg", ".jpeg"])):
			filename, extension = os.path.splitext(entry.path)
			print(entry.name, entry.path)
			infile = entry.path
			outfile = filename + "-resize" + extension
			
			os.remove(infile)
			os.rename(outfile, infile)
					
