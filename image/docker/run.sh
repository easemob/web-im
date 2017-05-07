#!/bin/bash

eval $(docker-machine env default)
CURDIR=$(cd "$(dirname "$0")"; pwd)
SERVER=`docker-machine ip`
docker run -d --name=webim -p=8089:8089    -e "SERVER=${SERVER}" docker-registry-cn.easemob.com/kubernetes/im/webim:latest
docker ps


