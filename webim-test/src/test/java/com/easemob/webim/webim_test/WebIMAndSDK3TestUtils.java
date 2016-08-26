package com.easemob.webim.webim_test;

import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.Set;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.easemob.webim.service.pubsub.PubSubServiceImpl;
import com.easemob.webim.service.pubsub.RedisChannel;

public class WebIMAndSDK3TestUtils extends WebIMTestBase {

	private static final Logger logger = LoggerFactory.getLogger(WebIMAndSDK3TestUtils.class);
	// public static String username = "gvt1";
	// public static String password = "1";
	public static String username2 = "gvt";
	public static String groupId = "1472018123922";
	public static String message = "hello";
	public static String imageName = "sea.jpg";

	public String path;
	public WebDriver driver;
	private PubSubServiceImpl pubsub;
	private String commandChannel;
	private String resultChannel;

	public void init(PubSubServiceImpl pubsub, String commandChannel, String resultChannel) {
		super.init();
		this.pubsub = pubsub;
		this.commandChannel = commandChannel;
		this.resultChannel = resultChannel;
		path = getScreenshotPath("WebIMAndSDK3TestUtils");
		driver = new FirefoxDriver();
	}

	public void login() {
		super.login(driver, username, password, path, isGetBaseUrl);
		if (isGetBaseUrl) {
			isGetBaseUrl = false;
		}
	}

	public void logout() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		try {
			super.logout(driver, path);
		} catch (Error e) {
			logger.error("Failed to run {}, encouter Error", method, e);
		} catch (Exception e) {
			logger.error("Failed to run {}, encouter Exception", method, e);
		}
	}

	public void quit() {
		logger.info("End to webim auto test on firefox... ");
		if (null != driver) {
			try {
				driver.quit();
			} catch (Exception e) {
				logger.error("Failed to quit driver:", e);
			}
		}
	}

	// receive probe signal
	public boolean send_ack() {
		String msg = "ack";
		logger.info("publish message: {}", msg);
		pubsub.publish(commandChannel, msg);
		return true;
	}

	// receive text message from friend
	public boolean chat_text_recv() {
		boolean result = false;
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		try {
			login();
			logger.info("start to find special friend: {}", username2);
			WebElement ele = findSpecialFriend(driver, username2, path);
			int seconds = 60;
			result = checkChatMsg(driver, username, username2, message, path, seconds);
		} catch (Error e) {
			logger.error("Failed to run {}, encouter Error", method, e);
			result = false;
		} catch (Exception e) {
			logger.error("Failed to run {}, encouter Exception", method, e);
			result = false;
		}
		logger.info("{} get result: {}", method, result);
		publishMsg(method, result);
		setEnd(result);
		return result;
	}

	// receive image message from stranger
	public boolean chat_image_recv() {
		boolean result = false;
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		try {
			login();
			logger.info("start to find special friend: {}", username2);
			WebElement ele = findSpecialFriend(driver, username2, path);
			int seconds = 60;
			result = checkChatMsg(driver, username, username2, imageName, path, seconds);
		} catch (Error e) {
			logger.error("Failed to run {}, encouter Error", method, e);
			result = false;
		} catch (Exception e) {
			logger.error("Failed to run {}, encouter Exception", method, e);
			result = false;
		}
		logger.info("{} get result: {}", method, result);
		publishMsg(method, result);
		setEnd(result);
		return result;
	}

	// receive text message from group
	public boolean group_text_recv() {
		boolean result = false;
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		try {
			login();
			logger.info("start to find special group: {}", groupId);
			WebElement ele = findSpecialGroup(driver, groupId, path);
			String id = ele.getAttribute("id");
			int seconds = 60;
			result = checkChatMsg(driver, username, id, message, path, seconds);
		} catch (Error e) {
			logger.error("Failed to run {}, encouter Error", method, e);
			result = false;
		} catch (Exception e) {
			logger.error("Failed to run {}, encouter Exception", method, e);
			result = false;
		}
		logger.info("{} get result: {}", method, result);
		publishMsg(method, result);
		setEnd(result);
		return result;
	}

	// receive image message from group
	public boolean group_image_recv() {
		boolean result = false;
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		try {
			login();
			logger.info("start to find special group: {}", groupId);
			WebElement ele = findSpecialGroup(driver, groupId, path);
			String id = ele.getAttribute("id");
			int seconds = 60;
			result = checkChatMsg(driver, username, id, imageName, path, seconds);
		} catch (Error e) {
			logger.error("Failed to run {}, encouter Error", method, e);
			result = false;
		} catch (Exception e) {
			logger.error("Failed to run {}, encouter Exception", method, e);
			result = false;
		}
		logger.info("{} get result: {}", method, result);
		publishMsg(method, result);
		setEnd(result);
		return result;
	}

	// refuse friend invitation
	public boolean friend_invatation_refuse() {
		boolean result = false;
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		try {
			login();
			logger.info("start to refuse friend invitation from {}", username2);
			String xpath = "//button[@class='btn cancelButton']";
			int seconds = 60;
			WebElement ele = findElement(driver, xpath, path, seconds);
			ele.click();
			sleep(3);
			logger.info("find new friend: {}", username2);
			findNoExistingFriend(driver, username2, path);
			result = true;
		} catch (Error e) {
			logger.error("Failed to run {}, encouter Error", method, e);
			result = false;
		} catch (Exception e) {
			logger.error("Failed to run {}, encouter Exception", method, e);
			result = false;
		}
		logger.info("{} get result: {}", method, result);
		publishMsg(method, result);
		setEnd(result);
		return result;
	}

	// accept friend invitation
	public boolean friend_invatation_accept() {
		boolean result = false;
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		try {
			login();
			logger.info("start to accept friend invitation from {}", username2);
			String xpath = "//button[@class='btn btn-primary confirmButton']";
			int seconds = 60;
			WebElement ele = findElement(driver, xpath, path, seconds);
			ele.click();
			sleep(3);
			logger.info("find new friend: {}", username2);
			findSpecialFriend(driver, username2, path);
			result = true;
		} catch (Error e) {
			logger.error("Failed to run {}, encouter Error", method, e);
			result = false;
		} catch (Exception e) {
			logger.error("Failed to run {}, encouter Exception", method, e);
			result = false;
		}
		logger.info("{} get result: {}", method, result);
		publishMsg(method, result);
		setEnd(result);
		return result;
	}

	// receive finish command
	public void send_finish() {
		setEnd(false);
	}

	private void publishMsg(String method, boolean result) {
		String msg = "TRUE " + method;
		if (!result) {
			msg = "FALSE " + method;
		}
		logger.info("publish message: {}", msg);
		pubsub.publish(commandChannel, msg);
	}

	private void setEnd(boolean result) {
		if (!result) {
			WebIMAndSDK3Test.END = true;
		}
	}

	private WebElement findElement(WebDriver driver, String xpath, String path, int seconds)
			throws InterruptedException {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		int count = 0;
		boolean end = false;
		WebElement ele = null;
		while (!end && null == ele) {
			try {
				ele = findElement(driver, xpath, path);
			} catch (Error e) {
				if (count < seconds) {
					Thread.currentThread().sleep(1 * 1000L);
					count++;
					continue;
				}
				logger.error("Failed to run {}, encouter Error", method, e);
				end = true;
				ele = null;
			} catch (Exception e) {
				logger.error("Failed to run {}, encouter Exception", method, e);
				end = true;
				ele = null;
			}
		}
		return ele;
	}

	private boolean checkChatMsg(WebDriver driver, String username, String username2, String msg, String path, int seconds)
			throws InterruptedException {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		int count = 0;
		boolean end = false;
		boolean result = false;
		while (!end) {
			try {
				checkChatMsg(driver, username, username2, msg, path);
				end = true;
				result = true;
			} catch (Error e) {
				if (count < seconds) {
					Thread.currentThread().sleep(1 * 1000L);
					count++;
					continue;
				}
				logger.error("Failed to run {}, encouter Error", method, e);
				end = true;
			} catch (Exception e) {
				logger.error("Failed to run {}, encouter Exception", method, e);
				end = true;
			}
		}
		return result;
	}

}
