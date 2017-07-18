#!/bin/bash

docker-compose pull webim
docker-compose up -d
docker images |grep none |awk '{print $3}'|xargs docker rmi