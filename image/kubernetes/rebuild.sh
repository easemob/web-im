#!/bin/bash

set -o pipefail

./stop.sh && \
./build_image.sh && \
./run.sh

