#!/bin/bash

if [[ -z $TAG ]]; then
    TAG="latest"
fi

echo TAG=$TAG

mkdir -p /root/.ssh
echo "${SSH_KEY}" > /root/.ssh/id_rsa
chmod 600 /root/.ssh/id_rsa

expect <<-EOF
set timeout -1
spawn ssh -p$JUMPSERVER_PORT easemob@$JUMPSERVER_HOST
    expect {
        "(yes/no)?" {
                send "yes\r"
                expect "\~\]" {send "ssh ${ONLINE_HOST}\r"}
            }
        "\~\]" {send "ssh ${ONLINE_HOST}\r"}
    }
    expect "\~"
    send "cd /data/Dockerfile/kubernetes/webim\r"
    send "./update.sh ${TAG}\r"
    send "exit\r"
    expect "\~\]"
    send "exit\r"
    expect eof
EOF

cd tag
mv tag_online tag_bak
echo $TAG > tag_online

echo tag_bak=`cat tag_bak`
echo tag_online=`cat tag_online`

echo "online image tag back succeed"