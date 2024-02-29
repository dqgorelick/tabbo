#! /usr/bin/env bash

source scripts/utils.sh

BROWSERS=('chrome' 'firefox')

for BROWSER in "${BROWSERS[@]}"; do
	borderPrint "Building for ${BROWSER}"

		# --detailed-report \
	npx parcel build \
		--config .parcelrc-webextension \
		--dist-dir dist/unpacked/$BROWSER \
		src/$BROWSER-manifest.json
done

# manager automatically builds help and configuration as well
# ENTRYPOINTS=('manager')
#
# if [[ "$1" != "" ]]; then
# 	inArray "${ENTRYPOINTS[@]}" $1
#
# 	if (( $? == 0 )); then
# 		ENTRYPOINTS=($1)
# 	else
# 		echo 'Invalid entrypoint'
# 		exit 1
# 	fi
# fi
#
# for ENTRYPOINT in ${ENTRYPOINTS[@]}; do
# 	borderPrint "Running parcel on ${ENTRYPOINT}..."
# 	parcelBuild $ENTRYPOINT
# done
