#! /usr/bin/env bash

#set -eu

function textBorder() {
	local STR="$*"
	local LEN=${#STR}
	local TOP_BOTTOM=""

	for (( INDEX=0; INDEX < LEN + 4; INDEX++ )); do
		TOP_BOTTOM+='-'
	done

	printf '%b\n' "${TOP_BOTTOM}\n| ${STR} |\n${TOP_BOTTOM}"
}

textBorder 'Running webpack...'
printf '%b\n' "$TEXT_BORDER_RET"
npx webpack 2>&1 | tee -a $LOG

if [[ ! -d ./dist ]]; then
	mkdir -p dist/unpacked/scripts
	mkdir -p dist/packed
fi

textBorder 'Copying HTML files...'
cp -r src/*.html dist/unpacked/

textBorder 'Copying image files...'
cp -r src/images dist/unpacked/

textBorder 'Copying style files...'
cp -r src/styles dist/unpacked/

textBorder 'Copying manifest...'
cp -r manifest.json dist/unpacked/

textBorder 'Copying bundled js files...'
cp -r dist/scripts/* dist/unpacked/scripts/

textBorder 'Packaging extension...'
pushd dist/unpacked
zip -r --exclude=*.DS_Store* -FS ../packed/tabbo.zip *
popd

textBorder 'Linting...'
npx addons-linter dist/packed/tabbo.zip

printf 'Log file: %s\n' $LOG
