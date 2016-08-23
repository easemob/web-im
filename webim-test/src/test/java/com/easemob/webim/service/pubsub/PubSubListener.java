package com.easemob.webim.service.pubsub;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.JedisPubSub;

/**
 * pubsub listener is used to listen pubsub service, e.g. publish message,
 * subscribe message
 * 
 * @author zhouhu
 * @date 2016/07/06
 */
public class PubSubListener extends JedisPubSub {

	private static final Logger logger = LoggerFactory.getLogger(PubSubListener.class);
	private boolean isSubscribe = false;
	private Set<String> channels = new HashSet<String>();
	private Map<String, Processor> processors = new HashMap<String, Processor>();

	@Override
	public void onMessage(String channel, String message) {
		logger.info("pubsub service: receive message: {} from channel: {}", message, channel);
		try {
			Processor processor = getProcessor(channel);
			processor.process(this, message);
		} catch (Exception e) {
			logger.error("onMessage encounter some error", e);
		}
		
	}

	@Override
	public void onSubscribe(String channel, int subscribedChannels) {
		setSubscribe(true);
		logger.info("pubsub service: subscirbe channel: {}", channel);
		try {
			Processor processor = getProcessor(channel);
			processor.onSubscribe(this);
		} catch (Exception e) {
			logger.error("onSubscribe encounter some error", e);
		}
	}

	@Override
	public void onUnsubscribe(String channel, int subscribedChannels) {
		logger.info("pubsub service: unsubscirbe channel: {}", channel);
		try {
			Processor processor = getProcessor(channel);
			processor.onUnsubscribe(this);
		} catch (Exception e) {
			logger.error("onUnsubscribe encounter some error", e);
		}
	}

	private Processor getProcessor(String channel) {
		if (processors.containsKey(channel)) {
			return processors.get(channel);
		}
		if (channel.equals(RedisChannel.RESULT_CHANNLE_1.getChannel())) {
			processors.put(channel, new ResultChannel1Processor());
			return processors.get(channel);
		} else if (channel.equals(RedisChannel.RESULT_CHANNLE_2.getChannel())) {
			processors.put(channel, new ResultChannel2Processor());
			return processors.get(channel);
		}
		logger.warn("Can't find any processor for channel: {}", channel);
		return null;
	}

	public void onException(Set<String> channels) {
		setSubscribe(false);
		for (String channel : channels) {
			try {
				Processor processor = getProcessor(channel);
				processor.onException(this);
			} catch (Exception e) {
				logger.error(
						"pubsub service error: some exception happened when channel processor executes onException methond: channel: {}",
						channel, e);
			}
		}
	}

	public void addChannels(String... channels) {
		if (null != channels && channels.length > 0) {
			for (String channel : channels) {
				this.channels.add(channel);
			}
		}
	}

	public void removeChannels(String... channels) {
		if (null != channels && channels.length > 0) {
			for (String channel : channels) {
				this.channels.remove(channel);
			}
		}
	}

	public boolean isSubscribe() {
		return isSubscribe;
	}

	public void setSubscribe(boolean isSubscribe) {
		this.isSubscribe = isSubscribe;
	}

	public Set<String> getChannels() {
		return channels;
	}

	public void setChannels(Set<String> channels) {
		this.channels = channels;
	}
}
