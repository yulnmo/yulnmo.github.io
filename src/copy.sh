#!/bin/sh
rm ../*.json
rm ../*.html
rm ../*.png
rm ../*.jpg
rm ../*.jpeg
rm ../*.ico
rm ../*.txt
rm ../*.mp3
rm ../*.svg
rm -rf ../static
rm -rf ../photos
rm -rf ../assets
cp -R ./build/* ../
