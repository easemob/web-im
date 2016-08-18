package com.easemob.webim.service.pubsub;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.easemob.webim.webim_test.WebIMTestBase;

public class ResultChannel1Processor extends BasicProcessor {
	private static Set<String> SUCCESS = null;
	private static Set<String> FAILURE = null;
	private static Map<String, String> OTHERS = null;
	private static final Logger logger = LoggerFactory.getLogger(ResultChannel1Processor.class);

	@Override
	public void process(PubSubListener listener, String message) {
		logger.info("Parse result message: {}", message);
		if (StringUtils.isNotBlank(message)) {
			getCreateGroupMsg(message, OTHERS);
			boolean r = true;
			r = true;
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
	
	private void getCreateGroupMsg(String message, Map<String, String> map) {
		if (null != map && map.size() > 0) {
			List<String> list = getLegalJson(message);
			for (String s : list) {
//				logger.info("get s = " + s);
				JSONObject jo = JSON.parseObject(s);
				boolean success = true;
				for (String key : map.keySet()) {
					success = success && jo.containsKey(key) && jo.getString(key).equals((String)map.get(key));
					if (success) {
						continue;
					}
					break;
				}
				if (success) {
					logger.info("parse create group message: {}", s);
					WebIMTestBase.GROUP_ID = jo.getString("groupID");
				}
			}
		}
	}
	
	private List<String> getLegalJson(String message) {
		List<String> result = new ArrayList();
		if (!message.contains("DATA_FROM_CLIENT:")) {
			return result;
		}
		String[] split = message.split("(DATA_FROM_CLIENT:)");
		message = split[split.length - 1];
		split = message.split("(\n\n)");
		for (String s : split) {
			result.add(s);
		}
		return result;
	}
	
	public static void setSuccess(Set<String> set) {
		SUCCESS = set;
	}
	
	public static void setFailure(Set<String> set) {
		FAILURE = set;
	}

	public static void setOthers(Map<String, String> others) {
		OTHERS = others;
	}
	
}
