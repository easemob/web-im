FROM docker-registry-cn.easemob.com/im/nginx-vim:latest
MAINTAINER Wen Ke <wenke@easemob.com>

RUN mkdir -p /data/apps/opt/
COPY webim /data/apps/opt/webim
RUN chown -R nginx:nginx /data/apps/opt/webim
COPY webim.conf.nginx /etc/nginx/conf.d/webim.conf
COPY run.sh /
RUN chmod 755 /run.sh
ENTRYPOINT ["/run.sh"]
