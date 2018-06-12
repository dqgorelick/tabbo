#!/usr/bin/env bash

set -e

if [[ ! -d 'webextension-polyfill' ]]; then
	git submodule init
	git submodule update
fi

pushd webextension-polyfill

git pull origin master

npm install

npm run build

npm run test

popd
