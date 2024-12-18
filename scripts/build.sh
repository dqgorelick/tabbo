#! /usr/bin/env bash

source scripts/utils.sh

BROWSERS=('chrome' 'firefox')

for BROWSER in "${BROWSERS[@]}"; do
	borderPrint "Building for ${BROWSER}"

	npx parcel build \
		--config .parcelrc-webextension \
		--dist-dir dist/unpacked/$BROWSER \
		src/$BROWSER-manifest.json
done
