#! /usr/bin/env bash

function textBorder() {
	local STR=$1
	local LEN=${#STR}
	local TOP_BOTTOM=""

	for (( INDEX=0; INDEX < LEN + 4; INDEX++ )); do
		TOP_BOTTOM+='-'
	done

	printf '%b\n' "${TOP_BOTTOM}\n| ${STR} |\n${TOP_BOTTOM}"
}

function parcelBuild() {
	local NAME=$1

	npx parcel build \
		--log-level 4 \
		--detailed-report \
		--out-dir 'dist/unpacked/scripts' \
		--out-file "${NAME}.bundle.js" \
		--public-url './' \
		"src/scripts/${NAME}/index.ts"
}

textBorder 'Type checking...'
npx tsc --noEmit

ENTRYPOINTS=('background' 'popup' 'manager')

for ENTRYPOINT in ${ENTRYPOINTS[@]}; do
	textBorder "Running parcel on ${ENTRYPOINT}..."
	parcelBuild $ENTRYPOINT
done

if [[ ! -d ./dist/packed ]]; then
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

textBorder 'Packaging extension...'
pushd dist/unpacked
zip -r --exclude=*.DS_Store* -FS ../packed/tabbo.zip *
popd

textBorder 'Linting extension...'
npx addons-linter dist/packed/tabbo.zip

printf 'Log file: %s\n' $LOG
