#! /usr/bin/env bash

# background and popup are built by discovery in manifest.json
npx parcel build \
	--config .parcelrc-webextension \
	--detailed-report \
	--dist-dir "dist/unpacked/" \
	--public-url './' \
	"manifest.json"

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
