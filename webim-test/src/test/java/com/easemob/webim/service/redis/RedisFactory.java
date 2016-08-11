package com.easemob.webim.service.redis;

import java.net.URI;
import java.net.URISyntaxException;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.easemob.webim.test.exception.RedisServiceException;

import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class RedisFactory {
	public static int POOL_MAX_TOTAL = 10;
	public static int TIMEOUT = 600;
	
	public static String REDIS_URI = "REDIS_URI";
	public static String INTERNAL_REDIS_URI = "INTERNAL_REDIS_URI";
	
	private static final Logger logger = LoggerFactory.getLogger(RedisFactory.class);

	public static JedisPool createJedisPool(URI uri, int timeout) {
		JedisPoolConfig config = new JedisPoolConfig();
		config.setMaxTotal(POOL_MAX_TOTAL);
		if (timeout <= 0) {
			timeout = TIMEOUT;
		}
		return new JedisPool(config, uri.getHost(), uri.getPort(), timeout);
	}
	
	public static JedisPool createJedisPool(URI uri) {
		return createJedisPool(uri, TIMEOUT);
	}
	
	public static URI getRedisURI() throws URISyntaxException {
		URI uri = null;
		String uristr = null;
		if (StringUtils.isNotBlank(System.getProperty(REDIS_URI))) {
			uristr = System.getProperty(REDIS_URI);
		} else if (StringUtils.isNotBlank(System.getProperty(INTERNAL_REDIS_URI))) {
			uristr = System.getProperty(INTERNAL_REDIS_URI);
		}
		if (StringUtils.isNoneBlank(uristr)) {
			uri = new URI(uristr);
		}
		if (null == uri) {
			throw new RedisServiceException("Can't get redis uri from config: " + uristr);
		}
		logger.info("Get redis uri: {}", uri);
		return uri;
	}
}
