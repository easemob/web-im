#!/bin/bash

cd webim-online

docker images |grep webim-online|awk '{print $3}'|xargs docker rmi -f

docker build -t docker-registry-cn.easemob.com/kubernetes/im/webim-online:latest .

docker push docker-registry-cn.easemob.com/kubernetes/im/webim-online:latest
