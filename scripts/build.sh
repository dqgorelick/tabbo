#! /usr/bin/env bash

#set -eu

echo 'Running webpack...'
npx webpack

if [[ ! -d ./dist ]]; then
	mkdir -p dist/unpacked/scripts
	mkdir -p dist/packed
fi

echo 'Copying HTML files...'
cp -r src/*.html dist/unpacked/

echo 'Copying image files...'
cp -r src/images dist/unpacked/

echo 'Copying style files...'
cp -r src/styles dist/unpacked/

echo 'Copying manifest...'
cp -r manifest.json dist/unpacked/

echo 'Copying bundled js files...'
cp -r build/* dist/unpacked/scripts/

echo 'Packaging extension...'
zip -r -FS dist/packed/tabbo.zip dist/unpacked/*
