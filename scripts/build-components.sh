#!/usr/bin/env bash

source scripts/utils.sh

function parcelBuild() {
	local NAME=$1

	npx parcel build \
		--detailed-report \
		--out-dir 'dist/unpacked/components' \
		--out-file "${NAME}.bundle.js" \
		--public-url './' \
		"src/components/${NAME}.ts"
}

borderPrint "Running parcel on components..."
parcelBuild 'test'
