#! /usr/bin/env bash

source scripts/utils.sh

borderPrint "Formatting js"
npx prettier 'src/**/*.ts' --write
