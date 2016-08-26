package com.easemob.webim.service.pubsub;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.easemob.webim.webim_test.WebIMAndSDK3TestUtils;

public class ResultChannel3Processor extends BasicProcessor {
	private static final Logger logger = LoggerFactory.getLogger(ResultChannel3Processor.class);
	private static WebIMAndSDK3TestUtils webim;
	
	public static final String chat_text_recv = "chat_text_recv";
	public static final String chat_image_recv = "chat_image_recv";
	public static final String group_text_recv = "group_text_recv";
	public static final String group_image_recv = "group_image_recv";
	public static final String friend_invatation_accept = "contact_accept";
	public static final String friend_invatation_refuse = "contact_decline";
	public static final String send_ack = "probe";
	public static final String send_finish = "finish";


	@Override
	public void process(PubSubListener listener, String message) {
		
		logger.info("Parse result message: {}", message);
		if (StringUtils.isNotBlank(message)) {
			iniWebIMClient();
			if (message.equalsIgnoreCase(chat_text_recv)) {
				webim.chat_text_recv();
			} else if (message.equalsIgnoreCase(chat_image_recv)) {
				webim.chat_image_recv();
			} else if (message.equalsIgnoreCase(group_text_recv)) {
				webim.group_text_recv();
			} else if (message.equalsIgnoreCase(group_image_recv)) {
				webim.group_image_recv();
			} else if (message.equalsIgnoreCase(friend_invatation_accept)) {
				webim.friend_invatation_accept();
			} else if (message.equalsIgnoreCase(friend_invatation_refuse)) {
				webim.friend_invatation_refuse();
			} else if (message.equalsIgnoreCase(send_ack)) {
				webim.send_ack();
			} else if (message.equalsIgnoreCase(send_finish)) {
				webim.send_finish();
			}
		}
	}
	
	private void iniWebIMClient() {
		if (null == webim) {
			return;
		}
	}
	
	public static void setWebim(WebIMAndSDK3TestUtils webim) {
		ResultChannel3Processor.webim = webim;
	}

}
