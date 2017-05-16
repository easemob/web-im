FROM ubuntu:latest
MAINTAINER Wen Ke <wenke@easemob.com>

RUN rm -rf /var/lib/apt/lists/partial && apt-get update -o Acquire::CompressionTypes::Order::=gz &&  apt-get install -y expect &&  apt-get install -y ssh
RUN mkdir -p /root/.ssh
COPY id_rsa /root/.ssh/
RUN chmod 600 /root/.ssh/id_rsa
COPY run.sh /
RUN chmod 755 /run.sh
ENTRYPOINT ["/run.sh"]
