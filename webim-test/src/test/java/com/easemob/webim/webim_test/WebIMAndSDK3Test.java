package com.easemob.webim.webim_test;

import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.Set;

import org.openqa.selenium.firefox.FirefoxDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import com.easemob.webim.service.pubsub.PubSubServiceImpl;
import com.easemob.webim.service.pubsub.RedisChannel;
import com.easemob.webim.service.pubsub.ResultChannel3Processor;

@Listeners({ WebIMBaseListener.class })
@Test(suiteName = "WebIM_SDK_3_Test", testName = "WebIM_SDK_3_Integration_Test", groups = {
		"WebIM_SDK_3_Integration_Group" })
public class WebIMAndSDK3Test {
	private static final Logger logger = LoggerFactory.getLogger(WebIMAndSDK3Test.class);
	
//	private static final String uristr = "tcp://121.43.63.92:6379";
	private PubSubServiceImpl pubsub;
	private String commandChannel;
	private String resultChannel;
	private WebIMAndSDK3TestUtils webim;
	
	public static boolean END = false;
	
	@BeforeClass(alwaysRun = true)
	public void beforeClass() throws URISyntaxException {
		logger.info("Start to webim and sdk integration test...");
		pubsub = new PubSubServiceImpl();
		Set<String> channels = new HashSet<String>();
		commandChannel = RedisChannel.COMMAND_CHANNLE_3.getChannel();
		resultChannel = RedisChannel.RESULT_CHANNLE_3.getChannel();
		channels.add(resultChannel);
		try {
			pubsub.init(channels);
		} catch (URISyntaxException e) {
			throw new RuntimeException("Failed to ini redis pubsub service", e);
		}
		this.webim = new WebIMAndSDK3TestUtils();
		webim.init(pubsub, commandChannel, resultChannel);
		ResultChannel3Processor.setWebim(webim);
	}
	
	@SuppressWarnings("static-access")
	@Test(enabled = true)
	public void test() throws InterruptedException {
		while (!END) {
			Thread.currentThread().sleep(1000L);
		}
	}
	
	@AfterClass(alwaysRun = true)
	public void afterClass() {
		webim.quit();
	}
}
