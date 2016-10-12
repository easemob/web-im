#! /bin/sh

rm -rf publish
mkdir publish
cp -r demo/images publish/
mkdir -p publish/demo/javascript
cp -r demo/javascript/dist publish/demo/javascript/
mkdir publish/sdk
cp -r sdk/dist publish/sdk
mkdir publish/webrtc
cp -r webrtc/dist publish/webrtc
cp favicon.ico publish/
cp index.html publish/