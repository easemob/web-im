package com.easemob.webim.webim_test;

import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.openqa.selenium.Alert;
import org.openqa.selenium.WebElement;
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
import com.easemob.webim.service.pubsub.ResultChannel1Processor;
import com.google.common.base.Preconditions;

@Listeners({ WebIMBaseListener.class })
@Test(suiteName = "WebIM_SDK_Test", testName = "WebIM_SDK_Integration_Test", groups = { "WebIM_SDK_Integration_Group" })
public class WebIMAndSDKTest extends WebIMTestBase {
	private static final Logger logger = LoggerFactory.getLogger(WebIMAndSDKTest.class);
	private static final String PARENT_PATH = "src/main/templates/";
	private static final String TEMPLATE_FILE_SUFFIX = ".vm";
	private PubSubServiceImpl pubsub;
	private String username2;
	private String password2;
	private String nickname2;
	private String message;

	@BeforeClass
	public void beforeClass() throws URISyntaxException {
		logger.info("Start to webim and sdk integration test...");
		init();
		// launch Redis pub/sub service
		pubsub = new PubSubServiceImpl();
		pubsub.init();
		driver = new FirefoxDriver();
	}

	@Test(enabled = true)
	public void register() {
		Preconditions.checkArgument(null != driver, "webdriver was missing");
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		username2 = "webimtest" + getRandomStr(8);
		password2 = "123456";
		nickname2 = "webimnick" + getRandomStr(8);
		logger.info("generate random username: {}, password: {}, nickname: {}", username2, password2, nickname2);
		driver.get(baseUrl);
		driver.manage().window().maximize();
		sleep(5);
		String xpath = "//button[@class='flatbtn-blu'][@tabindex='4']";
		WebElement reg = findElement(driver, xpath, path);
		reg.click();
		sleep(5);
		xpath = "//input[@id='regist_username']";
		WebElement ele = findElement(driver, xpath, path);
		ele.clear();
		ele.sendKeys(username2);

		xpath = "//input[@id='regist_password']";
		ele = findElement(driver, xpath, path);
		ele.clear();
		ele.sendKeys(password2);

		xpath = "//input[@id='regist_nickname']";
		ele = findElement(driver, xpath, path);
		ele.clear();
		ele.sendKeys(nickname2);

		logger.info("click ok button");
		xpath = "//button[@id='confirm-regist-confirmButton']";
		ele = findElement(driver, xpath, path);
		ele.click();
		sleep(10);

		Alert alert = driver.switchTo().alert();
		String text = alert.getText();
		Assert.assertTrue(text.contains("注册成功"), "alert should indecate successful register");
		alert.accept();
		sleep(3);
		isGetBaseUrl = false;
	}

	@Test(enabled = true, dependsOnMethods = { "register" })
	public void loginWebIM() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		super.login(driver, username, password, path, isGetBaseUrl);
	}

	@SuppressWarnings({ "static-access" })
	@Test(enabled = true, dependsOnMethods = { "loginWebIM", "register" })
	public void webimAddFriendAndSdkAccept() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		logger.info("Start to user: {} adds friend: {} from webim...", username, username2);
		logger.info("click add friend button");
		sleep(5);
		String xpath = "//button[@class='btn btn-inverse dropdown-toggle'][@data-toggle='dropdown']";
		WebElement ele = findElement(driver, xpath, path);
		ele.click();
		sleep(1);
		xpath = "//ul[@class='dropdown-menu']/li[@onclick='showAddFriend()']";
		ele = findElement(driver, xpath, path);
		ele.click();
		sleep(3);
		logger.info("input friend id: {}", username2);
		xpath = "//input[@id='addfridentId']";
		ele = findElement(driver, xpath, path);
		ele.clear();
		ele.sendKeys(username2);
		sleep(1);
		logger.info("click add button");
		xpath = "//button[@id='addFridend']";
		ele = findElement(driver, xpath, path);
		ele.click();
		sleep(5);
		logger.info("Start to send command to sdk to accept friend addition request...");
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username1", username);
		map.put("password1", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, "friend");
		pubsub.publish(RedisChannel.COMMAND_CHANNLE_1.getChannel(), cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
	}

	@Test(enabled = true, dependsOnMethods = { "webimAddFriendAndSdkAccept" })
	public void checkFriendList() throws InterruptedException {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
	}

	@SuppressWarnings("static-access")
	@Test(enabled = true, dependsOnMethods = { "checkFriendList" })
	public void sdkSendMsgAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		message = getRandomStr(16);
		logger.info("Start to send command to sdk to send message: {}", message);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username1", username);
		map.put("password1", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("message", message);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, message);
//		setFailure(username, username2, message, "failed");
		pubsub.publish(RedisChannel.COMMAND_CHANNLE_1.getChannel(), cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
	}
	
	@Test(enabled = true, dependsOnMethods = { "sdkSendMsgAndWebimReceive" })
	public void receiveMsg() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		sleep(5);
		checkChatMsg(driver, username, username2, message, path);
	}

	@Test(enabled = true, dependsOnMethods = { "receiveMsg" })
	public void deleteUser() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("click delete friend button");
		sleep(5);
		String xpath = "//button[@class='btn btn-inverse dropdown-toggle'][@data-toggle='dropdown']";
		WebElement ele = findElement(driver, xpath, path);
		ele.click();
		sleep(1);
		xpath = "//ul[@class='dropdown-menu']/li[@onclick='showDelFriend()']";
		ele = findElement(driver, xpath, path);
		ele.click();
		sleep(3);
		logger.info("input friend id: {}", username2);
		xpath = "//input[@id='delfridentId']";
		ele = findElement(driver, xpath, path);
		ele.clear();
		ele.sendKeys(username2);
		sleep(1);
		logger.info("click delete button");
		xpath = "//button[@id='delFridend']";
		ele = findElement(driver, xpath, path);
		ele.click();
		sleep(5);
	}

	@Test(enabled = false, dependsOnMethods = { "deleteUser" })
	public void logoutWebIM() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		super.logout(driver, path);
	}

	@AfterClass(alwaysRun = true)
	public void afterClass() {
		logger.info("End to webim auto test on firefox... ");
		if (null != driver) {
			try {
				driver.quit();
			} catch (Exception e) {
				logger.error("Failed to quit driver:", e);
			}
		}
	}

	private void setSuccess(String... str) {
		Set<String> success = new HashSet<String>();
		StringBuffer sb = new StringBuffer("Check success message: ");
		for (String s : str) {
			success.add(s);
			sb.append(s).append(",");
		}
		logger.info(sb.toString());
		ResultChannel1Processor.setSuccess(success);
	}

	private void setFailure(String... str) {
		Set<String> failure = new HashSet<String>();
		StringBuffer sb = new StringBuffer("Check failure message: ");
		for (String s : str) {
			failure.add(s);
			sb.append(s).append(",");
		}
		logger.info(sb.toString());
		ResultChannel1Processor.setFailure(failure);
	}

	@SuppressWarnings("static-access")
	private void waitResult(final int seconds) {
		logger.info("Wait {} seconds for result message from redis", seconds);
		for (int i = 0; i < seconds; i++) {
			if (null == super.REGRATION_TEST_RESULT) {
				try {
					Thread.currentThread().sleep(1 * 1000L);
				} catch (InterruptedException e) {
					logger.error("Failed to sleep {} seconds", seconds, e);
				}
				continue;
			}
			logger.info("Get the test result : " + super.REGRATION_TEST_RESULT);
			break;
		}
	}

	private String getTemplateFile(String file) {
		String path = PARENT_PATH + file + TEMPLATE_FILE_SUFFIX;
		logger.info("Get template file: {}", path);
		return path;
	}
}
