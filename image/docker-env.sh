#!/bin/sh
#if [[ `uname -s` = "Darwin" ]]; then
#    eval $(minikube docker-env)
#fi

function stopService(){
    name=$1

    echo "=== k8s stop ${name} begin ==="
    # run kubectl cmd
    kubectl delete ConfigMap cluster-config --ignore-not-found
    kubectl delete ConfigMap eva-config --ignore-not-found
    kubectl delete secret  cn-registry --ignore-not-found
    kubectl delete service,ReplicationController ${name} --ignore-not-found

    echo -n waiting.
    running=true
    while ${running}
    do
        #wait stop
        pods=`kubectl get pods|grep "${name}"`
        if [[ ${pods} = "" ]]; then
            running=false
            echo ""
            break
        fi
        sleep 1
        echo -n .
    done

    echo "=== k8s stop ${name} end  ==="
}

function cleanContainers(){
    name=$1
    containers=`docker ps -a|grep "${name}:"|awk '{print $1}'`
    echo "=== clean ${name} containers begin ==="
    if [[ ${containers} != "" ]]; then
        echo "conainers:${containers}"
        for c in ${containers}
        do
            docker rm -f ${c} &
        done
        echo -n waiting .
        waiting=true
        while ${waiting}
        do
            #wait cleanup containers
            containers=`docker ps |grep "${name}:"`
            if [[ ${containers} = "" ]]; then
                waiting=false
                echo ""
                break
            fi
            sleep 1
            echo -n .
        done
    fi
    echo "=== clean ${name} containers end ==="
}

function cleanImages(){
    name=$1
    images=`docker images|grep ${name}|awk '{print $3}'`
    echo "=== clean ${name} images begin ==="
    if [[ ${images} != "" ]]; then
        echo "images:${images}"
        for i in ${images}
        do  
            docker rmi -f ${i}
        done
    fi
    echo "=== clean ${name} images end ==="
}

function cleanUp(){
    cleanContainers $1
    cleanImages $1
}

function stopAndClean(){
    stopService $1
    cleanUp $1
}
