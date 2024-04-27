import os, sys
from PIL import Image

if (len(sys.argv) < 2):
	basePath = "./"
else:
	basePath = sys.argv[1].strip()

with os.scandir(basePath) as it:
	for entry in it:
		if (any(entry.name.lower().endswith(x) for x in [".jpg", ".jpeg"])):
			filename, extension = os.path.splitext(entry.path)
			print(entry.name, entry.path)
			infile = entry.path
			outfile = filename + "-resize" + extension
			
			if infile != outfile:
				try:
					im = Image.open(infile)
					size = im.size
					size = (size[0] / 3, size[1] / 3)
					im.thumbnail(size, Image.Resampling.LANCZOS)
					im.save(outfile, "JPEG")
				except IOError:
					print("cannot create thumbnail for '%s'" % infile)

