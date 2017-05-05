#!/bin/bash

set -e

CURDIR=$(cd "$(dirname "$0")"; pwd)
. ${CURDIR}/../docker-env.sh


cd ../../

VERSION=`grep version sdk/package.json|awk -F '"' '{printf("%s",$4)}'`
echo version=$VERSION
#replace follows manually first so far(will replaced by shell script automatically later):
#sdk/package.json
#sdk/README.md
#sdk/demo.html
#package.json
#CHANGELOG.md
#index.html
#webpack.config.js
#build/webpack.dev.js
#build/webpack.prod.js

IMAGE_NAME="docker-registry-cn.easemob.com/kubernetes/im/webim"
IMAGE_TAG=$IMAGE_NAME:$VERSION


echo "=== Building  image ${IMAGE_TAG} ==="


echo 'webpack begin...'
webpack
echo 'webpack done!'

rm -rf web-im
rm -f web-im-*.zip
rm -rf publish
mkdir -p publish/demo/javascript
cp -r demo/images publish/demo
cp -r demo/stylesheet publish/demo
cp -r demo/javascript/dist publish/demo/javascript/
rm publish/demo/javascript/dist/debug.js
cp -r demo/javascript/src publish/demo/javascript/
mkdir publish/sdk
cp -r sdk/dist publish/sdk
cp -r sdk/src publish/sdk
cp sdk/*.* publish/sdk
cp -r webrtc  publish
cp favicon.ico publish/
cp index.html publish/
cp CHANGELOG.md publish/
cp package.json publish/

cp webpack.config.js publish/
cp README.md publish/
cp .babelrc publish/

file_conf="./demo/javascript/dist/webim.config.js"

if [ ! -f "$file_conf" ]; then
    mv publish/demo/javascript/dist/webim.config.js.default publish/demo/javascript/dist/webim.config.js
fi

# windowSDK: delete webRTC associated files
isWindowSDK=`grep 'isWindowSDK' ./demo/javascript/dist/webim.config.js |awk -F ':' '{printf("%s",$2)}' |awk -F ',' '{printf("%s",$1)}'`
echo isWindowSDK=${isWindowSDK##* }
if [ ${isWindowSDK##* } == 'true' ]
then
    rm -rf publish/webrtc
    rm -rf publish/demo/javascript/src
    rm -rf publish/sdk/src
    sed -i '32,38d' publish/index.html
fi

# not debug mode: 1.delete debug.js, 2.strophe.js->strophe-1.2.8.min.js
isDebug=`grep 'isDebug' ./demo/javascript/dist/webim.config.js |awk -F ':' '{printf("%s",$2)}' |awk -F ',' '{printf("%s",$1)}'`
echo isDebug=${isDebug##* }
if [ ${isDebug##* } == 'false' ]
then
    sed -i '28d' publish/index.html
    sed -i '22,25d' publish/index.html
fi

if [ ${isWindowSDK##* } == 'false' ]
then
    sed -i '19,21d' publish/index.html
fi

echo 'publish done!'

rm -rf $CURDIR/webim/webim
mv publish $CURDIR/webim/webim

cd  $CURDIR/webim
docker build -t $IMAGE_TAG .

echo "=== Building done ==="
