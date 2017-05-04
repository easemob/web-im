#!/bin/sh

if [[ -z $TAG ]]; then
    TAG="latest"
fi

expect <<-EOF
set timeout -1
#登录北京集群跳板机
spawn ssh -p3299 easemob@182.92.219.104
    expect {
        "(yes/no)?" {
                send "yes\r"
                expect "\~\]" {send "ssh easemob@ebs-ali-beijing-eva1\r"}
            }
        "\~\]" {send "ssh easemob@ebs-ali-beijing-eva1\r"}
    }
    expect "\~\]"
    send "cd yiletian/Dockerfile\r"
    send "./start_eva.sh\r"
    send "exit\r"
    #退出跳板机
    expect "\~\]"
    send "exit\r"

    expect eof
EOF


#ssh -o StrictHostKeyChecking=no -p3299 easemob@182.92.219.104 << EOF
#   ssh easemob@ebs-ali-beijing-eva1 "cd yiletian/Dockerfile;docker-compose -f eva-compose.yaml pull eva-api eva-web;docker-compose -f eva-compose.yaml up -d"
#EOF