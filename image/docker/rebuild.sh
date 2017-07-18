#!/bin/bash
set -e
#eval $(docker-machine env default)
./stop.sh
./build_docker.sh
./run.sh

