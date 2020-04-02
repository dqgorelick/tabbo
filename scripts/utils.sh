#!/usr/bin/env bash

function borderPrint() {
	local STR=$1
	local LEN=${#STR}
	local TOP_BOTTOM=""

	for (( INDEX=0; INDEX < LEN + 4; INDEX++ )); do
		TOP_BOTTOM+='-'
	done

	printf '%b\n' "${TOP_BOTTOM}\n| ${STR} |\n${TOP_BOTTOM}"
}

function copyToUnpacked() {
	local SRC=$1

	cp -u -r "$SRC" dist/unpacked/
}

function inArray() {
	local ARRAY=($@)
	local SEARCH=$2

	local COUNT=$(( ${#ARRAY[@]} - 1 ))

	for ELEMENT in "${ARRAY[@]:0:$COUNT}"; do
		if [[ "$ELEMENT" == "$SEARCH" ]]; then
			return 0
		fi
	done

	return 1
}
