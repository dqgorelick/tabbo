#! /usr/bin/env bash

source scripts/utils.sh

borderPrint 'Running webpack...'
npx webpack

borderPrint 'Copying HTML files...'
cp -r src/*.html dist/unpacked/

borderPrint 'Copying image files...'
cp -r src/images dist/unpacked/

borderPrint 'Copying style files...'
cp -r src/styles dist/unpacked/

borderPrint 'Copying manifest...'
cp -r manifest.json dist/unpacked/
