#!/bin/bash
rm -rf platforms/bbww/www platforms/bbww/compiled
cp -r www platforms/bbww
cd platforms/bbww/www
cp ../config.xml ./
rm -rf spec spec.html res
rm -f `find . -name ".DS_*"`
rm *~
rm ../eventtrk.zip
zip -r ../eventtrk.zip *
cd ../
bbwp eventtrk.zip -o compiled 

echo "Compiled to platforms/bbww/compiled"
