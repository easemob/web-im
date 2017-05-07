#!/bin/bash

CURDIR=$(cd "$(dirname "$0")"; pwd)
. $CURDIR/../docker-env.sh

SERVER="$( kubectl cluster-info|grep master|awk -F'//' '{print $2}'|awk -F':' '{print $1}')"
echo "SERVER:${SERVER}"

cd ${CURDIR}

sed -i "s/\"\"/\"${SERVER}\"/g" config/config-map.yaml




# kubectl create secret docker-registry cn-registry --docker-server=https://docker-registry-cn.easemob.com --docker-username=easemob --docker-password=thepushbox --docker-email=admin@easemob.com

kubectl create -f ../config/secret.yaml

#先用master的内网IP替换(不能用外围IP) %EXTERNAL_IP%
kubectl create -f ../config/config-map.yaml

kubectl create -f webim.yaml

sleep 5

kubectl get pod,service,ReplicationController -l app=webim

echo "http://${SERVER}:31089"

echo "more info: kubectl get pod,service,ReplicationController -l app=webim"

