FROM docker-registry-cn.easemob.com/im/ubuntu-ssh-vim-expect:latest
MAINTAINER Wen Ke <wenke@easemob.com>


COPY run.sh /
RUN chmod 755 /run.sh
ENTRYPOINT ["/run.sh"]
