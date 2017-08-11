#! /bin/bash

npm run build

echo 'build done!'


cd ../image/docker

./build_docker.sh

docker push docker-registry-cn.easemob.com/kubernetes/im/webim:2.0

cd ../../demo

./remote_docker_restart.sh

echo '\nremote docker restarted'