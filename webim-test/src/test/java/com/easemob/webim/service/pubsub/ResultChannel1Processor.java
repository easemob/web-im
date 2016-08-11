package com.easemob.webim.service.pubsub;

import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.easemob.webim.webim_test.WebIMTestBase;

public class ResultChannel1Processor extends BasicProcessor {
	private static Set<String> SUCCESS = null;
	private static Set<String> FAILURE = null;
	private static final Logger logger = LoggerFactory.getLogger(ResultChannel1Processor.class);

	@Override
	public void process(PubSubListener listener, String message) {
		logger.info("Parse result message: {}", message);
		if (StringUtils.isNotBlank(message)) {
			boolean r = true;
			if (null != SUCCESS && SUCCESS.size() > 0) {
				for (String s : SUCCESS) {
					r = r && message.contains(s);
					if (r) {
						continue;
					}
					break;
				}
				if (r) {
					WebIMTestBase.REGRATION_TEST_RESULT = true;
					return;
				}
			}
			r = true;
			if (null != FAILURE && FAILURE.size() > 0) {
				for (String s : FAILURE) {
					r = r && message.contains(s);
					if (r) {
						continue;
					}
					break;
				}
				if (r) {
					WebIMTestBase.REGRATION_TEST_RESULT = false;
					return;
				}
			}
			logger.info("Get result message from redis: {}", message);
		}
	}
	
	public static void setSuccess(Set<String> set) {
		SUCCESS = set;
	}
	
	public static void setFailure(Set<String> set) {
		FAILURE = set;
	}
}
