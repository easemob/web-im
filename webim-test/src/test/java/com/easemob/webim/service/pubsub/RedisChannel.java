package com.easemob.webim.service.pubsub;

public enum RedisChannel {
	COMMAND_CHANNLE_1("webim-sdk-channel-1", "This channel is used to send webim command to sdk"),
	RESULT_CHANNLE_1("webim-sdk-result-channel-1", "This channel is used to receive sdk result");
	
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
