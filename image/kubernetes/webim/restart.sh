#!/usr/bin/env bash


echo "=== k8s  webim stop ==="
 kubectl delete service,ReplicationController webim


echo "=== k8s  webim start ==="
 kubectl create -f webim.yaml

 sleep 5

 kubectl get pod,service,ReplicationController -l app=webim

echo "more info:"
echo "kubectl get pod,service,ReplicationController -l app=webim"

