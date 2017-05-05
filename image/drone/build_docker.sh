#!/bin/bash

set -e
cd eva-web-deploy

docker images |grep eva-web-deploy|awk '{print $3}'|xargs docker rmi -f

docker build -t docker-registry-cn.easemob.com/kubernetes/im/eva-web-deploy:latest .

docker push docker-registry-cn.easemob.com/kubernetes/im/eva-web-deploy:latest
