#!/usr/bin/env bash

set -e

if [[ ! -d 'webextension-polyfill' ]]; then
	git submodule init
	git submodule update
fi

if [[ $1 == 'update' ]]; then
	git submodule update --remote --merge
fi

pushd webextension-polyfill

npm install

npm run build

npm run test

popd
