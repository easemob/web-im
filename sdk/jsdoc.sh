#!/bin/sh

rm -rf jsdoc/out
jsdoc src/connection.js -c jsdoc/conf.json
