#!/usr/bin/env bash
#
source scripts/utils.sh

BROWSERS=('chrome' 'firefox')

for BROWSER in "${BROWSERS[@]}"; do
	borderPrint "Packing for ${BROWSER}"

	if [[ ! -d ./dist/packed/$BROWSER ]]; then
		mkdir -p dist/packed/$BROWSER
	fi

	pushd dist/unpacked/$BROWSER
	zip -r --exclude=*.DS_Store* -FS ../../packed/$BROWSER/tabbo.zip *
	popd
done
