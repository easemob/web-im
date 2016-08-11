package com.easemob.webim.test.exception;

public class WebIMAutoTestException extends RuntimeException {
	private static final long serialVersionUID = -1357232960470376390L;

	public WebIMAutoTestException(String msg) {
		super(msg);
	}

	public WebIMAutoTestException(String msg, Exception e) {
		super(msg, e);
	}

	public WebIMAutoTestException() {
		super();
	}
}
