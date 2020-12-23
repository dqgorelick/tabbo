#! /usr/bin/env bash

source scripts/utils.sh

function parcelBuild() {
	local NAME=$1

	npx parcel build \
		--detailed-report \
		--out-dir 'dist/unpacked/scripts' \
		--out-file "${NAME}.bundle.js" \
		--public-url './' \
		"src/scripts/${NAME}/index.ts"
}

ENTRYPOINTS=('background')

if [[ "$1" != "" ]]; then
	inArray "${ENTRYPOINTS[@]}" $1

	if (( $? == 0 )); then
		ENTRYPOINTS=($1)
	else
		echo 'Invalid entrypoint'
		exit 1
	fi
fi

for ENTRYPOINT in ${ENTRYPOINTS[@]}; do
	borderPrint "Running parcel on ${ENTRYPOINT}..."
	parcelBuild $ENTRYPOINT
done
