#! /usr/bin/env bash

source scripts/utils.sh

function parcelBuild() {
	local NAME=$1

	# TODO change after redesign is done
	npx parcel build \
		--detailed-report \
		--out-dir 'dist/unpacked/' \
		--out-file "${NAME}.html" \
		--public-url './' \
		"src/${NAME}.html"
}

ENTRYPOINTS=('popup' 'manager')

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
