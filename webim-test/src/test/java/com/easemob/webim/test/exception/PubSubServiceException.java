package com.easemob.webim.test.exception;

public class PubSubServiceException extends RuntimeException {
	private static final long serialVersionUID = 1701177522517781542L;

	public PubSubServiceException(String msg) {
		super(msg);
	}

	public PubSubServiceException(String msg, Exception e) {
		super(msg, e);
	}

	public PubSubServiceException() {
		super();
	}

}
