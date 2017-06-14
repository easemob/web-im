#!/bin/bash

set -e
cd webim-rollback

docker images |grep webim-rollback|awk '{print $3}'|xargs docker rmi -f

docker build -t docker-registry-cn.easemob.com/kubernetes/im/webim-rollback:latest .

docker push docker-registry-cn.easemob.com/kubernetes/im/webim-rollback:latest
