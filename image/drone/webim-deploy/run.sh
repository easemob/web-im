#!/bin/bash

if [[ -z $TAG ]]; then
    TAG="latest"
fi


mkdir -p /root/.ssh
echo "${SSH_KEY}" > /root/.ssh/id_rsa
chmod 600 /root/.ssh/id_rsa


expect <<-EOF
set timeout -1

spawn ssh -p$JUMPSERVER_PORT easemob@$JUMPSERVER_HOST
    expect {
        "(yes/no)?" {
                send "yes\r"
                expect "\~\]" {send "ssh ${SANDBOX_HOST}\r"}
            }
        "\~\]" {send "ssh ${SANDBOX_HOST}\r"}
    }
    expect "\~"
    send "cd /data/Dockerfile/docker-compose/webim/${TAG}\r"
    send "./restart.sh\r"
    send "exit\r"
    expect "\~\]"
    send "exit\r"
    expect eof
EOF