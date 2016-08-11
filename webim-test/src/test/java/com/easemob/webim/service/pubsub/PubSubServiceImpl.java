package com.easemob.webim.service.pubsub;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.easemob.webim.service.redis.RedisFactory;
import com.easemob.webim.test.exception.PubSubServiceException;
import com.google.common.base.Preconditions;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

/**
 * pubsub service implements
 * 
 * @author zhouhu <zhouhu@easemob.com>
 * @date 2016/07/06
 */
public class PubSubServiceImpl implements PubSubService {

    private JedisPool PubSubJedisPool;

    private PubSubListener listener;

    private static final Logger logger = LoggerFactory.getLogger(PubSubServiceImpl.class);

    private ScheduledExecutorService thread = Executors.newScheduledThreadPool(1);

    public void init() throws URISyntaxException {
    	URI uri = RedisFactory.getRedisURI();
    	PubSubJedisPool = RedisFactory.createJedisPool(uri);
    	listener = new PubSubListener();
        Set<String> channels = new HashSet<String>();
        channels.add(RedisChannel.RESULT_CHANNLE_1.getChannel());
        if (null != channels && channels.size() > 0) {
            listener.addChannels(channels.toArray(new String[channels.size()]));
            subscribeChannels();
        }
    }

    @Override
    public void publish(String channel, String message) {
        Preconditions.checkArgument(StringUtils.isNotBlank(channel) && StringUtils.isNotBlank(message),
                "pubsub service error: channel or message was missing when publish message");
        try (Jedis jedis = PubSubJedisPool.getResource()) {
            logger.info("pubsub service: publish: channel: {}, message:\n {}", channel, message);
            jedis.publish(channel, message);
        } catch (Exception e) {
            logger.error("pubsub service error: publish service: pubsub redis publish message encounters exception", e);
            throw new PubSubServiceException("publish service internal error when publishing message", e);
        }
    }

    private void subscribeChannels() {
        try {
            thread.scheduleWithFixedDelay(() -> {
                try (Jedis jedis = PubSubJedisPool.getResource()) {
                    if (listener.getChannels().size() > 0 && !listener.isSubscribe()) {
                        StringBuffer sb = new StringBuffer();
                        for (String channel : listener.getChannels()) {
                            sb.append(channel).append(",");
                        }
                        logger.info("pubsub service: pubsub redis client subscribe channels: {}", sb.toString());
                        jedis.subscribe(listener, listener.getChannels().toArray(new String[listener.getChannels().size()]));
                    }
                } catch (Exception e) {
                    logger.error("pubsub service error: pubsub redis client subscribe channels or process message encounters exception", e);
                    listener.onException(listener.getChannels());
                }
            }, 0L, 100L, TimeUnit.MILLISECONDS);
        } catch (Exception e) {
            logger.error("pubsub service error: some exception happened when initializing pubsub service", e);
            throw new PubSubServiceException("pubsub service internal error when initialization");
        }
    }

    @Override
    public void subscribe(PubSubListener listener, String[] channels) {
        try {
            Set<String> set = new HashSet<String>();
            if (null != channels && channels.length > 0) {
                for (String c : channels) {
                	set.add(c);                }
            }
            if (set.size() > 0) {
                listener.addChannels(set.toArray(new String[set.size()]));
                listener.subscribe(set.toArray(new String[set.size()]));
            }
        } catch (Exception e) {
            logger.error("pubsub service error: subscribe service: pubsub redis subscribe channels encounters exception", e);
            throw new PubSubServiceException("pubsub service internal error when subscribing channels");
        }
    }

    @Override
    public void unsubscribe(PubSubListener listener, String[] channels) {
        try {
            Set<String> set = new HashSet<String>();
            if (null != channels && channels.length > 0) {
                for (String c : channels) {
                	set.add(c);
                }
            }
            if (set.size() > 0) {
                listener.removeChannels(set.toArray(new String[set.size()]));
                listener.unsubscribe(set.toArray(new String[set.size()]));
            }
        } catch (Exception e) {
            logger.error("pubsub service error: unsubscribe service: pubsub redis unsubscribe channels encounters exception", e);
            throw new PubSubServiceException("pubsub service internal error when unsubscribing channels");
        }
    }
}
