#!/bin/sh

rm -rf jsdoc/out
jsdoc src/connection.js -c jsdoc/conf.json

#npm install -g jsdoc-to-markdown
#jsdoc2md ./src/connection.js > ./jsdoc/out.md