#! /usr/bin/env bash

source scripts/utils.sh

borderPrint "Formatting html"
npx prettier 'src/**/*.html' --write
