#!/bin/bash

echo "=== container stopping ==="
docker stop webim
docker rm  webim
echo "=== container stopped ==="