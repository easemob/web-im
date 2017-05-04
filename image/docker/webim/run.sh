#!/bin/bash

if [[ -z $IM_SERVER ]]; then
    IM_SERVER="im-api.easemob.com"
fi

if [[ -z $REST_SERVER ]]; then
    REST_SERVER="a1.easemob.com"
fi

if [[ -z $APPKEY ]]; then
    APPKEY="easemob-demo#chatdemoui"
fi



CONFIG=/data/apps/opt/webim/demo/javascript/dist/webim.config.js

sed -i "s/im-api.easemob.com/${IM_SERVER}/g" $CONFIG
sed -i "s/a1.easemob.com/${REST_SERVER}/g" $CONFIG
sed -i "s/easemob-demo#chatdemoui/${APPKEY}/g" $CONFIG


/nginx.sh start
while true; do
   sleep 5
done

