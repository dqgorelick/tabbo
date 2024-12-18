#! /usr/bin/env bash

source scripts/utils.sh

borderPrint "Formatting css"
npx prettier 'src/**/*.scss' --write
