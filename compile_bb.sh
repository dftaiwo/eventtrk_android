#!/bin/bash
rm -rf platforms/bb/www platforms/bb/compiled
cp -r www platforms/bb
cd platforms/bb/www
cp ../config.xml ./
rm -rf spec spec.html res
rm -f `find . -name ".DS_*"`
rm *~
rm ../eventtrk.zip
zip -r ../eventtrk.zip *
cd ../
bbwp eventtrk.zip -o compiled 

echo "Compiled to platforms/bb/compiled"
