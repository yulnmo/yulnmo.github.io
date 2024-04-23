#!/bin/sh
rm ../*.json
rm ../*.html
rm ../*.png
rm ../*.ico
rm ../*.txt
rm -rf ../static
cp -R ./build/* ../
