package com.easemob.webim.webim_test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import com.easemob.webim.service.pubsub.ResultChannel1Processor;

public class WebIMBaseListener implements ITestListener {
	
	private static final Logger logger = LoggerFactory.getLogger(WebIMBaseListener.class);

	@Override
	public void onTestStart(ITestResult result) {
		logger.info("**************Start Test: " + result.getMethod().getMethodName() + " **************");
		WebIMTestBase.REGRATION_TEST_RESULT = null;
		WebIMTestBase.GROUP_ID = null;
		ResultChannel1Processor.setSuccess(null);
		ResultChannel1Processor.setFailure(null);
		ResultChannel1Processor.setOthers(null);
 	}

	@Override
	public void onTestSuccess(ITestResult result) {
		logger.info("**************Success Test: " + result.getMethod().getMethodName() + " **************");
	}

	@Override
	public void onTestFailure(ITestResult result) {
		logger.info("**************Fail Test: " + result.getMethod().getMethodName() + " **************");
	}

	@Override
	public void onTestSkipped(ITestResult result) {
		logger.info("**************Skip Test: " + result.getMethod().getMethodName() + " **************");		
	}

	@Override
	public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onStart(ITestContext context) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onFinish(ITestContext context) {
		// TODO Auto-generated method stub
		
	}

}
