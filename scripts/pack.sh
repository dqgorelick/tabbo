#!/usr/bin/env bash

if [[ ! -d ./dist/packed ]]; then
	mkdir -p dist/packed
fi

pushd dist/unpacked
zip -r --exclude=*.DS_Store* -FS ../packed/tabbo.zip *
popd
