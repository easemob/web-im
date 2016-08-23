package com.easemob.webim.webim_test;

import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
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
import com.easemob.webim.service.pubsub.ResultChannel2Processor;
import com.google.common.base.Preconditions;

@Listeners({ WebIMBaseListener.class })
@Test(suiteName = "WebIM_SDK_Test", testName = "WebIM_SDK_Integration_Test", groups = { "WebIM_SDK_2_Integration_Group" })
public class WebIMAndSDK2Test extends WebIMTestBase {
	private static final Logger logger = LoggerFactory.getLogger(WebIMAndSDK2Test.class);
	private static final String PARENT_PATH = "src/main/templates2/";
	private static final String TEMPLATE_FILE_SUFFIX = ".vm";
	private PubSubServiceImpl pubsub;
	private String username;
	private String password;
	private String nickname; 
	private String username2;
	private String password2;
	private String nickname2;
	private String username3;
	private String password3;
	private String nickname3;
	private String message;
	private String commandChannel;
	private String resultChannel;
	private String group1;
	private String groupId1;
	private String group2;
	private String groupId2;
	private String group3;
	private String groupId3;
	private String group4;
	private String groupId4;
	private String emoji = "[:D]";
	private String imgPath = "src/main/resources/test_img.png";
	private String audioPath = "src/main/resources/test_audio.mp3";
	private String filePath = "src/main/resources/test_file.txt";
	private String file2 = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.dat";
	private String image2 = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.jpg";
	private String audio2 = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.amr";
	private String chatroom = "twy-room1";
	private String chatroomId = "114715680632209992";

	@BeforeClass
	public void beforeClass() throws URISyntaxException {
		logger.info("Start to webim and sdk integration test...");
		init();
		// launch Redis pub/sub service
		pubsub = new PubSubServiceImpl();
		Set<String> channels = new HashSet<String>();
		commandChannel = RedisChannel.COMMAND_CHANNLE_2.getChannel();
		resultChannel = RedisChannel.RESULT_CHANNLE_2.getChannel();
		channels.add(resultChannel);
		pubsub.init(channels);
		driver = new FirefoxDriver();
	}
	
	@Test(enabled = false)
	public void foo() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		username = "user1_8h5z6z4a";
		password = "123456";
		username2 = "user2_lrzak0my";
		password2 = "123456";
		groupId1 = "1471608835353";
		group1 = "group1_dirl4xqy";
		
		super.login(driver, username, password, path, isGetBaseUrl);
		String[] sp = filePath.split("/");
		String fp = sp[sp.length - 1];
		String data_type = "file";
		logger.info("select group: {} to send file: {}", group1, fp);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");

		logger.info("Start to user: {} sends file: {} into group: {}", username, fp, group1);
		// ---------------------------
		int count = 0;
		int timeout = 240;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		setSuccess(username2, "txt");
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		sendFile(driver, filePath, data_type, path);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		logger.info("Check txt file: {} has been send", fp);
		checkChatMsg(driver, username, groupId, fp, path);
	}
	
	@Test(enabled = true)
	public void registerUser1() {
		Preconditions.checkArgument(null != driver, "webdriver was missing");
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		username = "user1_" + getRandomStr(8);
		password = "123456";
		nickname = "nick1_" + getRandomStr(8);
		logger.info("generate random username: {}, password: {}, nickname: {}", username, password, nickname);
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
		ele.sendKeys(username);

		xpath = "//input[@id='regist_password']";
		ele = findElement(driver, xpath, path);
		ele.clear();
		ele.sendKeys(password);

		xpath = "//input[@id='regist_nickname']";
		ele = findElement(driver, xpath, path);
		ele.clear();
		ele.sendKeys(nickname);

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
		logger.info("Register new user: username: {}, password: {}, nickname: {}", username, password, nickname);
		isGetBaseUrl = false;
	}
	
	@Test(enabled = true, dependsOnMethods = { "registerUser1" })
	public void registerUser2() {
		Preconditions.checkArgument(null != driver, "webdriver was missing");
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		username2 = "user2_" + getRandomStr(8);
		password2 = "123456";
		nickname2 = "nick2_" + getRandomStr(8);
		logger.info("generate random username: {}, password: {}, nickname: {}", username2, password2, nickname2);
//		driver.get(baseUrl);
//		driver.manage().window().maximize();
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
		logger.info("Register new user2: username: {}, password: {}, nickname: {}", username2, password2, nickname2);
		isGetBaseUrl = false;
	}
	
	@Test(enabled = true, dependsOnMethods = { "registerUser2" })
	public void registerUser3() {
		Preconditions.checkArgument(null != driver, "webdriver was missing");
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		username3 = "user3_" + getRandomStr(8);
		password3 = "123456";
		nickname3 = "nick3_" + getRandomStr(8);
		logger.info("generate random username: {}, password: {}, nickname: {}", username3, password3, nickname3);
//		driver.get(baseUrl);
//		driver.manage().window().maximize();
		sleep(5);
		String xpath = "//button[@class='flatbtn-blu'][@tabindex='4']";
		WebElement reg = findElement(driver, xpath, path);
		reg.click();
		sleep(5);
		xpath = "//input[@id='regist_username']";
		WebElement ele = findElement(driver, xpath, path);
		ele.clear();
		ele.sendKeys(username3);

		xpath = "//input[@id='regist_password']";
		ele = findElement(driver, xpath, path);
		ele.clear();
		ele.sendKeys(password3);

		xpath = "//input[@id='regist_nickname']";
		ele = findElement(driver, xpath, path);
		ele.clear();
		ele.sendKeys(nickname3);

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
		logger.info("Register new user3: username: {}, password: {}, nickname: {}", username3, password3, nickname3);
		isGetBaseUrl = false;
	}
	

	@Test(enabled = true, dependsOnMethods = { "registerUser3" })
	public void loginWebIM() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		super.login(driver, username, password, path, isGetBaseUrl);
	}
	
	@SuppressWarnings({ "static-access" })
	@Test(enabled = true, dependsOnMethods = { "loginWebIM" })
	public void webimAddFriendAndSdkAccept1() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("Start to user: {} adds friend: {} from webim...", username, username3);
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
		logger.info("input friend id: {}", username3);
		xpath = "//input[@id='addfridentId']";
		ele = findElement(driver, xpath, path);
		ele.clear();
		ele.sendKeys(username3);
		sleep(1);
		logger.info("click add button");
		xpath = "//button[@id='addFridend']";
		ele = findElement(driver, xpath, path);
		ele.click();
		sleep(5);
		logger.info("Start to send command to sdk to accept friend addition request...");
		int count = 0;
		int timeout = 240;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username3", username3);
		map.put("password3", password3);
		map.put("count", count);
		map.put("timeout", timeout);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(method, username, username3, "friend");
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
	}
	
	@SuppressWarnings({ "static-access" })
	@Test(enabled = true, dependsOnMethods = { "webimAddFriendAndSdkAccept1" })
	public void webimAddFriendAndSdkAccept2() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
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
		int timeout = 240;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(method, username, username2, "friend");
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
	}
	
	@SuppressWarnings({ "static-access" })
	@Test(enabled = true, dependsOnMethods = { "webimAddFriendAndSdkAccept2" })
	public void webimAddFriendAndSdkAccept3() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.logout(driver, path);
		super.login(driver, username3, password3, path, isGetBaseUrl);
		logger.info("Start to user: {} adds friend: {} from webim...", username3, username2);
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
		int timeout = 240;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("username3", username3);
		map.put("password3", password3);
		map.put("count", count);
		map.put("timeout", timeout);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(method, username2, username3, "friend");
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
	}

	@Test(enabled = true, dependsOnMethods = { "webimAddFriendAndSdkAccept3" })
	public void addPrivateGroupWithMemberAddtionEnabled() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.logout(driver, path);
		super.login(driver, username, password, path, isGetBaseUrl);
		group1 = "group1_" + getRandomStr(8);
		logger.info("Start to add user: {} into group: {}", username, group1);
		// ---------------------------
		int count = 0;
		int timeout = 240;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("username3", username3);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupname", group1);
		setSuccess(method, "group: " + group1, "owner: " + username2, "member: " + username);
		setGroupIdMsg(group1);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(5);
		Assert.assertTrue(StringUtils.isNoneBlank(super.GROUP_ID), "Get group1 id");
		groupId1 = super.GROUP_ID;
		logger.info("Get group id: {}, group name: {}", groupId1, group1);
		logger.info("Check group list with group: {}", group1);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		Assert.assertTrue(null != ele, "have found group: " + group1);
	}

	@Test(enabled = true, dependsOnMethods = { "addPrivateGroupWithMemberAddtionEnabled" })
	public void quitPrivateGroupWithMemberAddtionEnabled() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("Start to quit user: {} from group: {}", username, group1);
		// ---------------------------
		int count = 0;
		int timeout = 240;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId1);
		setSuccess("remove group member: groupId: " + groupId1, "owner: " + username2, "member: " + username);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(5);
		logger.info("Check group list with group: {}", group1);
		Assert.assertFalse(super.findNoExistingGroup(driver, group1, path), "have found group: " + group1);
	}

	@Test(enabled = true, dependsOnMethods = { "quitPrivateGroupWithMemberAddtionEnabled" })
	public void addPrivateGroupWithMemberAddtionEnabledByMember() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("Start to add user: {} into group: {} by member", username, group1);
		// ---------------------------
		int count = 0;
		int timeout = 240;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username3", username3);
		map.put("password3", password3);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId1);
		setSuccess("add group member: groupId: " + groupId1, "member: " + username3, "member: " + username);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(5);
		super.logout(driver, path);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("Check group list with group: {}", group1);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		Assert.assertTrue(null != ele, "have found group: " + group1);
	}

	@Test(enabled = false, dependsOnMethods = { "addPrivateGroupWithMemberAddtionEnabledByMember" })
	public void addPrivateGroupWithMemberAddtionDisable() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		group2 = "group2_" + getRandomStr(8);
		logger.info("Start to add user: {} into group: {}", username, group2);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("username3", username3);
		map.put("password3", password3);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupname", group2);
		setSuccess(method, "group: " + group2, "owner: " + username2, "member: " + username);
		setGroupIdMsg(group2);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(5);
		Assert.assertTrue(StringUtils.isNoneBlank(super.GROUP_ID), "Get group2 id");
		groupId2 = super.GROUP_ID;
		logger.info("Get group id: {}, group name: {}", groupId2, group2);
		logger.info("Check group list with group: {}", group2);
		WebElement ele = findSpecialGroup(driver, groupId2, path);
		Assert.assertTrue(null != ele, "have found group: " + group2);
	}

	@Test(enabled = false, dependsOnMethods = { "addPrivateGroupWithMemberAddtionDisable" })
	public void quitPrivateGroupWithMemberAddtionDisabled() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("Start to quit user: {} from group: {}", username, group2);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId2);
		setSuccess("remove group member: groupId: " + groupId2, "owner: " + username2, "member: " + username);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(5);
		logger.info("Check group list with group: {}", group2);
		Assert.assertFalse(super.findNoExistingGroup(driver, group2, path), "have found group: " + group2);
	}

	@Test(enabled = false, dependsOnMethods = { "quitPrivateGroupWithMemberAddtionDisabled" })
	public void addPrivateGroupWithMemberAddtionDisabledByOwner() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("Start to add user: {} into group: {} by member", username, group2);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId2);
		setSuccess("add group member: groupId: " + groupId2, "owner: " + username2, "member: " + username);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(5);
		logger.info("Check group list with group: {}", group2);
		WebElement ele = findSpecialGroup(driver, groupId2, path);
		Assert.assertTrue(null != ele, "have found group: " + group2);
	}

	@Test(enabled = false, dependsOnMethods = { "addPrivateGroupWithMemberAddtionDisabledByOwner" })
	public void addPublicGroupWithOwnerAccept() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		group3 = "group3_" + getRandomStr(8);
		logger.info("Start to add user: {} into group: {}", username, group3);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupname", group3);
		setSuccess(method, "group: " + group3, "owner: " + username2, "member: " + username);
		setGroupIdMsg(group3);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(5);
		Assert.assertTrue(StringUtils.isNoneBlank(super.GROUP_ID), "Get group3 id");
		groupId3 = super.GROUP_ID;
		logger.info("Get group id: {}, group name: {}", groupId3, group3);
		logger.info("Check group list with group: {}", group3);
		WebElement ele = findSpecialGroup(driver, groupId3, path);
		Assert.assertTrue(null != ele, "have found group: " + group3);
	}

	@Test(enabled = false, dependsOnMethods = { "addPublicGroupWithOwnerAccept" })
	public void addPublicGroupWithoutOwnerAccept() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		group4 = "group4_" + getRandomStr(8);
		logger.info("Start to add user: {} into group: {}", username, group4);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupname", group4);
		setSuccess(method, "group: " + group4, "owner: " + username2, "member: " + username);
		setGroupIdMsg(group4);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(5);
		Assert.assertTrue(StringUtils.isNoneBlank(super.GROUP_ID), "Get group4 id");
		groupId4 = super.GROUP_ID;
		logger.info("Get group id: {}, group name: {}", groupId4, group4);
		logger.info("Check group list with group: {}", group4);
		WebElement ele = findSpecialGroup(driver, groupId4, path);
		Assert.assertTrue(null != ele, "have found group: " + group4);
	}

	@Test(enabled = false, dependsOnMethods = { "addPublicGroupWithoutOwnerAccept" })
	public void blockPublicGroupMsg() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("Start to block group: {}", group1);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method + "1");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username3", username3);
		map.put("password3", password3);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId2);
		setSuccess(method, "block group mesage: groupId: " + groupId2, "member: " + username3);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(5);
		super.REGRATION_TEST_RESULT = null;
		message = getRandomStr(16);
		logger.info("Start to send msg: {} into group: {}", message, group2);
		WebElement ele = findSpecialGroup(driver, groupId2, path);
		String groupId = ele.getAttribute("id");
		logger.info("find text area for send message");
		String xpath = "//textarea[@id='talkInputId']";
		ele = findElement(driver, xpath, path);
		ele.click();
		ele.clear();
		ele.sendKeys(message);
		xpath = "//img[@onclick='sendText()']";
		logger.info("click send button");
		ele = findElement(driver, xpath, path);

		logger.info("Start to check block group: {} if receive message: {}", group2, message);
		// ---------------------------
		count = 1;
		timeout = 15;
		file = getTemplateFile(method + "2");
		map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username3", username3);
		map.put("password3", password3);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId2);
		setSuccess(method, message);
		cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		ele.click();
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		// ---------------------------
		logger.info("Check group message: {} has been send", message);
		checkChatMsg(driver, username, groupId, message, path);
		Assert.assertTrue(null == super.REGRATION_TEST_RESULT, "Can't receive excepted message from sdk");
	}

	@Test(enabled = false, dependsOnMethods = { "blockPublicGroupMsg" })
	public void DissolvePublicGroupWithOwnerAccept() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("Start to dissolve group: {} by owner: {}", group3, username2);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId3);
		setSuccess(method, "destroy groupId: " + groupId3);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(5);
		logger.info("Check group list with group: {}", group3);
		Assert.assertFalse(super.findNoExistingGroup(driver, group3, path), "have found group: " + group3);
	}

	@Test(enabled = false, dependsOnMethods = { "DissolvePublicGroupWithOwnerAccept" })
	public void addUserIntoBlackList() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("Start to add user: {} into group: {} blacklist", username, group4);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId4);
		setSuccess(method, "add member into group blacklist: member: " + username, "groupId: " + groupId4);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(5);
		logger.info("Check group list with group: {}", group4);
		if (findNoExistingGroup(driver, group4, path)) {
			logger.info("Check group list with group: {}", group4);
			WebElement ele = findSpecialGroup(driver, groupId4, path);
			String groupId = ele.getAttribute("id");
			message = getRandomStr(16);
			logger.info("find text area for send message: {}", message);
			String xpath = "//textarea[@id='talkInputId']";
			ele = findElement(driver, xpath, path);
			ele.click();
			ele.clear();
			ele.sendKeys(message);
			xpath = "//img[@onclick='sendText()']";
			logger.info("click send button");
			ele = findElement(driver, xpath, path);
			ele.click();
			logger.info("Check group message: {} has been send", message);
			checkChatMsg(driver, username, groupId, message, path);
		}
	}

	@Test(enabled = false, dependsOnMethods = { "addUserIntoBlackList" })
	public void webimSendGroupEmojiAndSdkReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("select group: {} to send emoji: {}", group1, emoji);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");
		logger.info("find text area for send emoji");
		String xpath = "//textarea[@id='talkInputId']";
		ele = findElement(driver, xpath, path);
		ele.click();
		ele.clear();
		ele.sendKeys(emoji);
		xpath = "//img[@onclick='sendText()']";
		logger.info("click send button");
		ele = findElement(driver, xpath, path);

		logger.info("Start to user: {} sends emoji: {} into group: {}", username2, emoji, group1);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		setSuccess(emoji);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		ele.click();
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
//		logger.info("Check group emoji: {} has been send", emoji);
//		checkChatMsg(driver, username, groupId, emoji, path);
	}

	@Test(enabled = false, dependsOnMethods = { "webimSendGroupEmojiAndSdkReceive" })
	public void sdkSendGroupEmojiAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);

		logger.info("Start to user: {} sends emoji: {} into group: {}", username2, emoji, group1);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId1);
		map.put("message", emoji);
		setSuccess(method, "send message: groupId: " + groupId1, "message: " + emoji);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		logger.info("select group: {} to send message: {}", group1, message);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");
//		logger.info("Check if receive emoji: {} in group: {}", emoji, group1);
//		checkChatMsg(driver, username, group1, emoji, path);
	}

	@Test(enabled = false, dependsOnMethods = { "sdkSendGroupEmojiAndWebimReceive" })
	public void sdkSendGroupEmojiAndWebimReceiveOffline() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		logger.info("Start to user: {} sends emoji: {} into group: {}", username2, emoji, group1);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId1);
		map.put("message", emoji);
		setSuccess(method, "send message: groupId: " + groupId1, "message: " + emoji);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("select group: {} to send message: {}", group1, message);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");
//		logger.info("Check if receive emoji: {} in group: {}", emoji, group1);
//		checkChatMsg(driver, username, group1, emoji, path);
	}

	// send/receive message
	@Test(enabled = true, dependsOnMethods = { "addPrivateGroupWithMemberAddtionEnabledByMember" })
	public void webimSendGroupMsgAndSdkReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		message = getRandomStr(16);
		logger.info("select group: {} to send message: {}", group1, message);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");
		logger.info("find text area for send message");
		String xpath = "//textarea[@id='talkInputId']";
		ele = findElement(driver, xpath, path);
		ele.click();
		ele.clear();
		ele.sendKeys(message);
		xpath = "//img[@onclick='sendText()']";
		logger.info("click send button");
		ele = findElement(driver, xpath, path);

		logger.info("Start to user: {} sends message: {} into group: {}", username2, message, group1);
		// ---------------------------
		int count = 0;
		int timeout = 60;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		setSuccess(message);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		ele.click();
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(30);
		logger.info("Check group message: {} has been send", message);
		checkChatMsg(driver, username, groupId, message, path);
	}

	@Test(enabled = false, dependsOnMethods = { "webimSendGroupMsgAndSdkReceive" })
	public void sdkSendGroupMsgAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		message = getRandomStr(16);
		logger.info("Start to user: {} sends message: {} into group: {}", username2, message, group1);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId1);
		map.put("message", message);
		setSuccess(method, "send message: groupId: " + groupId1, "message: " + message);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		logger.info("select group: {}", group1);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");
		logger.info("Check if receive message: {} in group: {}", message, group2);
		checkChatMsg(driver, username, groupId, message, path);
	}

	@Test(enabled = false, dependsOnMethods = { "sdkSendGroupMsgAndWebimReceive" })
	public void sdkSendGroupMsgAndWebimReceiveOffline() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		message = getRandomStr(16);
		logger.info("Start to user: {} sends message: {} into group: {}", username2, message, group2);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId2);
		map.put("message", message);
		setSuccess(method, "send message: groupId: " + groupId2, "message: " + message);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("select group: {}", group2);
		WebElement ele = findSpecialGroup(driver, groupId2, path);
		String groupId = ele.getAttribute("id");
		logger.info("Check if receive message: {} in group: {}", message, group2);
		checkChatMsg(driver, username, groupId, message, path);
	}

	// send/receive file
	@Test(enabled = true, dependsOnMethods = { "webimSendGroupMsgAndSdkReceive" })
	public void webimSendGroupFileAndSdkReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		String[] sp = filePath.split("/");
		String fp = sp[sp.length - 1];
		String data_type = "file";
		logger.info("select group: {} to send file: {}", group1, fp);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");

		logger.info("Start to user: {} sends file: {} into group: {}", username, fp, group1);
		// ---------------------------
		int count = 0;
		int timeout = 60;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		setSuccess(username2, "txt");
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		sendFile(driver, filePath, data_type, path);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		sleep(30);
		logger.info("Check txt file: {} has been send", fp);
		checkChatMsg(driver, username, groupId, fp, path);
	}

	@Test(enabled = false, dependsOnMethods = { "webimSendGroupFileAndSdkReceive" })
	public void sdkSendGroupFileAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);

		logger.info("Start to user: {} sends file: {} into group: {}", username2, group2, file2);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId2);
		map.put("file", file2);
		setSuccess(method, "send message: groupId: " + groupId2, "file: " + file2);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		logger.info("select group: {}", group2);
		WebElement ele = findSpecialGroup(driver, groupId2, path);
		String groupId = ele.getAttribute("id");
		sleep(5);
		logger.info("Check if receive file: {} in group: {}", file2, group2);
		checkChatMsg(driver, username, groupId, file2, path);
	}

	@Test(enabled = false, dependsOnMethods = { "sdkSendGroupFileAndWebimReceive" })
	public void sdkSendGroupFileAndWebimReceiveOffline() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		logger.info("Start to user: {} sends file: {} into group: {}", username2, file2, group1);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId1);
		map.put("file", file2);
		setSuccess(method, "send message: groupId: " + groupId1, "file: " + file2);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("select group: {}", group1);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");
		sleep(5);
		logger.info("Check if receive file: {} in group: {}", file2, group1);
		checkChatMsg(driver, username, groupId, file2, path);
	}

	// send/receive image
	@Test(enabled = false, dependsOnMethods = { "sdkSendGroupFileAndWebimReceiveOffline" })
	public void webimSendGroupImageAndSdkReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		String[] sp = imgPath.split("/");
		String fp = sp[sp.length - 1];
		String data_type = "img";
		logger.info("select group: {} to send image: {}", group2, fp);
		WebElement ele = findSpecialGroup(driver, groupId2, path);
		String groupId = ele.getAttribute("id");

		logger.info("Start to user: {} sends image: {} into group: {}", username, fp, group2);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		setSuccess(username2, "png");
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		sendFile(driver, imgPath, data_type, path);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		logger.info("Check image: {} has been send", fp);
		checkChatMsg(driver, username, groupId, fp, path);
	}

	@Test(enabled = false, dependsOnMethods = { "webimSendGroupImageAndSdkReceive" })
	public void sdkSendGroupImageAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);

		logger.info("Start to user: {} sends image: {} into group: {}", username2, image2, group1);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId1);
		map.put("file", image2);
		setSuccess(method, "send message: groupId: " + groupId1, "file: " + image2);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		logger.info("select group: {}", group1);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");
		sleep(5);
		logger.info("Check if receive image: {} in group: {}", image2, group1);
		checkChatMsg(driver, username, groupId, image2, path);
	}

	@Test(enabled = false, dependsOnMethods = { "sdkSendGroupImageAndWebimReceive" })
	public void sdkSendGroupImageAndWebimReceiveOffline() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		logger.info("Start to user: {} sends image: {} into group: {}", username2, image2, group2);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId2);
		map.put("file", image2);
		setSuccess(method, "send message: groupId: " + groupId2, "file: " + image2);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("select group: {}", group2);
		WebElement ele = findSpecialGroup(driver, groupId2, path);
		String groupId = ele.getAttribute("id");
		sleep(5);
		logger.info("Check if receive image: {} in group: {}", image2, group2);
		checkChatMsg(driver, username, groupId, image2, path);
	}

	// send/receive audio
	@Test(enabled = false, dependsOnMethods = { "sdkSendGroupImageAndWebimReceiveOffline" })
	public void webimSendGroupAudioAndSdkReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		String[] sp = audioPath.split("/");
		String fp = sp[sp.length - 1];
		String data_type = "audio";
		logger.info("select group: {} to send audio: {}", group1, fp);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");

		logger.info("Start to user: {} sends image: {} into group: {}", username, fp, group1);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		setSuccess(username2, "mp3");
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		sendFile(driver, audioPath, data_type, path);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		logger.info("Check audio: {} has been send", fp);
		checkChatMsg(driver, username, groupId, fp, path);
	}

	@Test(enabled = false, dependsOnMethods = { "webimSendGroupAudioAndSdkReceive" })
	public void sdkSendGroupAudioAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);

		logger.info("Start to user: {} sends audio: {} into group: {}", username2, audio2, group2);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId2);
		map.put("file", audio2);
		setSuccess(method, "send message: groupId: " + groupId2, "file: " + audio2);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		logger.info("select group: {}", group2);
		WebElement ele = findSpecialGroup(driver, groupId2, path);
		String groupId = ele.getAttribute("id");
		sleep(5);
		logger.info("Check if receive audio: {} in group: {}", audio2, group2);
		checkChatMsg(driver, username, groupId, audio2, path);
	}

	@Test(enabled = false, dependsOnMethods = { "sdkSendGroupAudioAndWebimReceive" })
	public void sdkSendGroupAudioAndWebimReceiveOffline() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		logger.info("Start to user: {} sends audio: {} into group: {}", username2, audio2, group1);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId1);
		map.put("file", audio2);
		setSuccess(method, "send message: groupId: " + groupId1, "file: " + audio2);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("select group: {}", group1);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");
		sleep(5);
		logger.info("Check if receive audio: {} in group: {}", audio2, group1);
		checkChatMsg(driver, username, groupId, audio2, path);
	}

	// receive location message
	@Test(enabled = false, dependsOnMethods = { "sdkSendGroupAudioAndWebimReceiveOffline" })
	public void sdkSendGroupLocationAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		message = getLocationMsg();
		logger.info("Start to user: {} sends location: {} into group: {}", username2, message, group2);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId2);
		map.put("message", message);
		setSuccess(method, "groupId: " + groupId2, "send message: " + message);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		logger.info("select group: {}", group2);
		WebElement ele = findSpecialGroup(driver, groupId2, path);
		String groupId = ele.getAttribute("id");
		sleep(5);
		logger.info("Check if receive location: {} in group: {}", message, group2);
		checkChatMsg(driver, username, groupId, message, path);
	}

	@Test(enabled = false, dependsOnMethods = { "sdkSendGroupLocationAndWebimReceive" })
	public void sdkSendGroupLocationAndWebimReceiveOffline() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		message = getLocationMsg();
		logger.info("Start to user: {} sends location: {} into group: {}", username2, message, group1);
		// ---------------------------
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("groupId", groupId1);
		map.put("message", message);
		setSuccess(method, "groupId: " + groupId1, "send message: " + message);
		String cmdMsg = super.getCommandMsg(file, map);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		// ---------------------------
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("select group: {}", group1);
		WebElement ele = findSpecialGroup(driver, groupId1, path);
		String groupId = ele.getAttribute("id");
		sleep(5);
		logger.info("Check if receive location: {} in group: {}", message, group1);
		checkChatMsg(driver, username, groupId, message, path);
	}

//	@Test(enabled = false, dependsOnMethods = { "sdkSendGroupLocationAndWebimReceiveOffline" })
//	public void checkGroupMsgSender() {
//		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
//		String path = getScreenshotPath(method);
//		super.login(driver, username, password, path, isGetBaseUrl);
//		message = getRandomStr(16);
//		logger.info("Start to user: {} sends message: {} into group: {}", username2, message, group2);
//		// ---------------------------
//		int count = 0;
//		int timeout = 15;
//		String file = getTemplateFile(method);
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("casename", method);
//		map.put("username", username);
//		map.put("password", password);
//		map.put("username2", username2);
//		map.put("password2", password2);
//		map.put("count", count);
//		map.put("timeout", timeout);
//		map.put("groupId", groupId2);
//		map.put("message", message);
//		setSuccess(method, "send message: groupId: " + groupId2, "message: " + message);
//		String cmdMsg = super.getCommandMsg(file, map);
//		pubsub.publish(this.commandChannel, cmdMsg);
//		logger.info("Start to wait callback message from sdk...");
//		waitResult(timeout);
//		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
//				"receive excepted message from sdk");
//		// ---------------------------
//		logger.info("select group: {}", group2);
//		WebElement ele = findSpecialGroup(driver, groupId2, path);
//		String groupId = ele.getAttribute("id");
//		logger.info("Check if receive message: {} in group: {}", message, group2);
//		checkMsgSender(driver, username, groupId, message, path);
//	}

	@SuppressWarnings({ "static-access" })
	@Test(enabled = false, dependsOnMethods = { "sdkSendGroupLocationAndWebimReceiveOffline" })
	public void webimAddFriendAndSdkReject() {
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
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(method, username, username2, "friend", "rejects");
		pubsub.publish(RedisChannel.COMMAND_CHANNLE_1.getChannel(), cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		logger.info("Check friend list for friend: {}", username2);
		Assert.assertFalse(findNoExistingFriend(driver, username2, path), "have found friend: " + username2);
	}

	@SuppressWarnings({ "static-access" })
	@Test(enabled = false, dependsOnMethods = { "webimAddFriendAndSdkReject" })
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
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(method, username, username2, "friend");
		pubsub.publish(RedisChannel.COMMAND_CHANNLE_1.getChannel(), cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		
		logger.info("Check friend list for friend: {}", username2);
		findSpecialFriend(driver, username2, path);
	}

	@Test(enabled = false, dependsOnMethods = { "webimAddFriendAndSdkAccept" })
	public void deleteFriend() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
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
		logger.info("Check friend list for friend: {}", username2);
		Assert.assertFalse(findNoExistingFriend(driver, username2, path), "have found friend: " + username2);
	}

	@SuppressWarnings({ "static-access" })
	@Test(enabled = false, dependsOnMethods = { "deleteFriend" })
	public void sdkAddFriendAndWebimAccept() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("Start to send command to sdk to add user: {}, user: {} as friend", username, username2);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(method, username, username2, "friend");
		pubsub.publish(RedisChannel.COMMAND_CHANNLE_1.getChannel(), cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		sleep(5);
		logger.info("Accept friend invitation from user: {}", username2);
		String xpath = "//button[@class='btn btn-primary confirmButton']";
		WebElement ele = findElement(driver, xpath, path);
		ele.click();
		sleep(3);
	}

	@Test(enabled = false, dependsOnMethods = { "sdkAddFriendAndWebimAccept" })
	public void checkFriendList() throws InterruptedException {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
	}

	// friend send/receive message
	@SuppressWarnings("static-access")
	@Test(enabled = true, dependsOnMethods = { "webimSendGroupFileAndSdkReceive" })
	public void webimSendMsgAndSdkReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		message = getRandomStr(16);
		logger.info("find special friend: {}", username2);
		WebElement ele = findSpecialFriend(driver, username2, path);
		sleep(3);
		logger.info("find message text area");
		String xpath = "//textarea[@id='talkInputId']";
		ele = findElement(driver, xpath, path);
		logger.info("talk to friend: {} with message: {}", username2, message);
		ele.clear();
		ele.sendKeys(message);
		logger.info("send msg");
		xpath = "//li/img[@onclick='sendText()']";
		ele = findElement(driver, xpath, path);

		logger.info("Start to send command to sdk to receive message: {}", message);
		int count = 0;
		int timeout = 60;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("message", message);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(message);
		pubsub.publish(this.commandChannel, cmdMsg);
		ele.click();
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		sleep(30);
		logger.info("Check message: {} has been send", message);
		checkChatMsg(driver, username, username2, message, path);
	}

	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "webimSendMsgAndSdkReceive" })
	public void sdkSendMsgAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		message = getRandomStr(16);
		logger.info("Start to send command to sdk to send message: {}", message);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("message", message);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, message);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		sleep(5);
		checkChatMsg(driver, username, username2, message, path);
	}

	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "sdkSendMsgAndWebimReceive" })
	public void sdkSendMsgAndWebimReceiveOffline() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		message = getRandomStr(16);
		logger.info("Start to send command to sdk to send message: {}", message);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("message", message);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, message);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		sleep(5);
		checkChatMsg(driver, username, username2, message, path);
	}

	// friend receive location
	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "sdkSendMsgAndWebimReceiveOffline" })
	public void sdkSendLocationAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		message = getLocationMsg();
		logger.info("Start to send command to sdk to send lcoation: {}", message);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("message", message);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, message);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		sleep(5);
		checkChatMsg(driver, username, username2, message, path);
	}

	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "sdkSendLocationAndWebimReceive" })
	public void sdkSendLocationAndWebimReceiveOffline() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		message = getLocationMsg();
		logger.info("Start to send command to sdk to send location: {}", message);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("message", message);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, message);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		sleep(5);
		checkChatMsg(driver, username, username2, message, path);
	}

	// friend send/receive file
	@SuppressWarnings("static-access")
	@Test(enabled = true, dependsOnMethods = { "webimSendMsgAndSdkReceive" })
	public void webimSendFileAndSdkReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		logger.info("send txt file: {} to friend: {}", filePath, username2);
		String[] sp = filePath.split("/");
		String fp = sp[sp.length - 1];
		String data_type = "file";
		sleep(3);

		logger.info("Start to send command to sdk to receive file: {}", fp);
		int count = 0;
		int timeout = 60;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username2, "txt");
		pubsub.publish(this.commandChannel, cmdMsg);
		sendFile(driver, filePath, data_type, path);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		sleep(30);
		logger.info("Check txt file: {} has been send", fp);
		checkChatMsg(driver, username, username2, fp, path);
	}

	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "webimSendFileAndSdkReceive" })
	public void sdkSendFileAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		message = getRandomStr(16);
		logger.info("Start to send command to sdk to send file: {}", file2);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("file", file2);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, file2);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		sleep(5);
		checkChatMsg(driver, username, username2, file2, path);
	}

	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "sdkSendFileAndWebimReceive" })
	public void sdkSendFileAndWebimReceiveOffline() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		message = getRandomStr(16);
		logger.info("Start to send command to sdk to send file: {}", file2);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("file", file2);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, file2);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		sleep(5);
		checkChatMsg(driver, username, username2, file2, path);
	}

	// friend send/receive image
	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "sdkSendFileAndWebimReceiveOffline" })
	public void webimSendImageAndSdkReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		logger.info("send image file: {} to friend: {}", imgPath, username2);
		String[] sp = imgPath.split("/");
		String fp = sp[sp.length - 1];
		String data_type = "img";
		sleep(3);

		logger.info("Start to send command to sdk to receive image: {}", fp);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username2, "png");
		pubsub.publish(this.commandChannel, cmdMsg);
		sendFile(driver, imgPath, data_type, path);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		logger.info("Check txt file: {} has been send", fp);
		checkChatMsg(driver, username, username2, fp, path);
	}

	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "webimSendImageAndSdkReceive" })
	public void sdkSendImageAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		message = getRandomStr(16);
		logger.info("Start to send command to sdk to send iamge: {}", image2);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("file", image2);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, image2);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		sleep(5);
		checkChatMsg(driver, username, username2, image2, path);
	}

	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "sdkSendImageAndWebimReceive" })
	public void sdkSendImageAndWebimReceiveOffline() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		message = getRandomStr(16);
		logger.info("Start to send command to sdk to send image: {}", image2);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("file", image2);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, image2);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		sleep(5);
		checkChatMsg(driver, username, username2, image2, path);
	}

	// friend send/receive audio
	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "sdkSendImageAndWebimReceiveOffline" })
	public void webimSendAudioAndSdkReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		logger.info("send image file: {} to friend: {}", audioPath, username2);
		String[] sp = audioPath.split("/");
		String fp = sp[sp.length - 1];
		String data_type = "audio";
		sleep(3);

		logger.info("Start to send command to sdk to receive audio: {}", fp);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username2, "mp3");
		pubsub.publish(this.commandChannel, cmdMsg);
		sendFile(driver, audioPath, data_type, path);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		logger.info("Check txt file: {} has been send", fp);
		checkChatMsg(driver, username, username2, fp, path);
	}

	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "webimSendAudioAndSdkReceive" })
	public void sdkSendAudioAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("Start to send command to sdk to send audio: {}", audio2);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("file", audio2);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, audio2);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		sleep(5);
		checkChatMsg(driver, username, username2, audio2, path);
	}

	@SuppressWarnings("static-access")
	@Test(enabled = false, dependsOnMethods = { "sdkSendAudioAndWebimReceive" })
	public void sdkSendAudioAndWebimReceiveOffline() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		logger.info("Start to send command to sdk to send audio: {}", audio2);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("file", audio2);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(username, username2, audio2);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		sleep(5);
		checkChatMsg(driver, username, username2, audio2, path);
	}

	@Test(enabled = false, dependsOnMethods = { "sdkSendAudioAndWebimReceiveOffline" })
	public void sdkSendChatroomMsgAndWebimReceive() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		message = getRandomStr(16);
		logger.info("Start to send command to sdk to send message: {}", message);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		map.put("message", message);
		map.put("chatroomId", chatroomId);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(method, chatroomId, message);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");
		sleep(5);
		logger.info("select first chatroom to send message");
		WebElement ele = findSpecialChatroom(driver, chatroomId, path);
		sleep(5);
		String cid = ele.getAttribute("id");
		checkChatMsg(driver, username, cid, message, path);
	}

	@Test(enabled = false, dependsOnMethods = { "sdkSendChatroomMsgAndWebimReceive" })
	public void addFriendIntoBlackList() {
		String method = Thread.currentThread().getStackTrace()[1].getMethodName();
		String path = getScreenshotPath(method);
		super.login(driver, username, password, path, isGetBaseUrl);
		super.logout(driver, path);
		logger.info("Start to send command to sdk to add user: {} into blacklist", username2);
		int count = 0;
		int timeout = 15;
		String file = getTemplateFile(method);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("casename", method);
		map.put("username", username);
		map.put("password", password);
		map.put("username2", username2);
		map.put("password2", password2);
		map.put("count", count);
		map.put("timeout", timeout);
		String cmdMsg = super.getCommandMsg(file, map);
		setSuccess(method, "add friend: " + username2, "blacklist", username);
		pubsub.publish(this.commandChannel, cmdMsg);
		logger.info("Start to wait callback message from sdk...");
		waitResult(timeout);
		Assert.assertTrue(null != super.REGRATION_TEST_RESULT && super.REGRATION_TEST_RESULT.booleanValue(),
				"receive excepted message from sdk");

		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		WebElement ele = findSpecialFriend(driver, username2, path);
		sleep(3);
		logger.info("find message text area");
		String xpath = "//textarea[@id='talkInputId']";
		ele = findElement(driver, xpath, path);
		message = getRandomStr(10);
		logger.info("talk to friend: {} with message: {}", username2, message);
		ele.clear();
		ele.sendKeys(message);
		logger.info("send msg");
		xpath = "//li/img[@onclick='sendText()']";
		ele = findElement(driver, xpath, path);
		ele.click();
		sleep(3);
		checkChatMsg(driver, username, username2, message, path);
		super.logout(driver, path);
		super.login(driver, username2, password2, path, isGetBaseUrl);
		logger.info("find friend: {}", username);
		ele = findSpecialFriend(driver, username, path);
		checkNoExistingChatMsg(driver, username2, username, message, path);
	}

	@Test(enabled = false, dependsOnMethods = { "addFriendIntoBlackList" })
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
		ResultChannel2Processor.setSuccess(success);
	}

	private void setFailure(String... str) {
		Set<String> failure = new HashSet<String>();
		StringBuffer sb = new StringBuffer("Check failure message: ");
		for (String s : str) {
			failure.add(s);
			sb.append(s).append(",");
		}
		logger.info(sb.toString());
		ResultChannel2Processor.setFailure(failure);
	}

	private void setGroupIdMsg(String subject) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("errCode", "0");
		map.put("cmdName", "creategroup");
		map.put("subject", subject);
		ResultChannel2Processor.setOthers(map);
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
