package com.easemob.webim.test.exception;

public class RedisServiceException extends RuntimeException {
	private static final long serialVersionUID = 1010477602750712068L;

	public RedisServiceException(String msg) {
		super(msg);
	}

	public RedisServiceException(String msg, Exception e) {
		super(msg, e);
	}

	public RedisServiceException() {
		super();
	}
}
