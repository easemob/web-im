#! /bin/sh

rm -rf publish
mkdir -p publish/demo/javascript
cp -r demo/images publish/demo
cp -r demo/stylesheet publish/demo
cp -r demo/javascript/dist publish/demo/javascript/
mkdir publish/sdk
cp -r sdk/dist publish/sdk
mkdir publish/webrtc
cp -r webrtc/dist publish/webrtc
cp favicon.ico publish/
cp index.html publish/

#windowSDK
rm publish/demo/javascript/dist/webim.config.js.demo
rm publish/sdk/dist/strophe.js
rm -rf publish/webrtc
sed -i '30,36d' publish/index.html
sed -i '26d' publish/index.html
sed -i '20,23d' publish/index.html
