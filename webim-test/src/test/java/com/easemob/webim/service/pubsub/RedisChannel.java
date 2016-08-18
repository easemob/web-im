package com.easemob.webim.service.pubsub;

public enum RedisChannel {
	COMMAND_CHANNLE_1("webim-sdk-channel-1", "This channel is used to send webim command to sdk 3.x"),
	RESULT_CHANNLE_1("webim-sdk-result-channel-1", "This channel is used to receive sdk 3.x result"),
	COMMAND_CHANNLE_2("webim-sdk-channel-2", "This channel is used to send webim command to sdk 2.x"),
	RESULT_CHANNLE_2("webim-sdk-result-channel-2", "This channel is used to receive sdk 2.x result");
	
	private String channel;
	private String description;
	
	private RedisChannel(String channel, String description) {
		this.channel = channel;
		this.description = description;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
