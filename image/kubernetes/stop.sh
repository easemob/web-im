#!/bin/bash

CURDIR=$(cd "$(dirname "$0")"; pwd)
. $CURDIR/../docker-env.sh

stopService webim
