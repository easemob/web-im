#!/bin/bash

set -e
cd webim-deploy

docker images |grep webim-deploy|awk '{print $3}'|xargs docker rmi -f

docker build -t docker-registry-cn.easemob.com/kubernetes/im/webim-deploy:latest .

docker push docker-registry-cn.easemob.com/kubernetes/im/webim-deploy:latest
