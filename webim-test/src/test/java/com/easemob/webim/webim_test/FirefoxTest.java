package com.easemob.webim.webim_test;

import java.util.List;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import com.google.common.base.Preconditions;

@Listeners({ WebIMBaseListener.class })
@Test(suiteName = "WebIM_Base_Test", testName = "WebIM_Base_Test_on_Firefox", groups = { "Firefox_Group" })
public class FirefoxTest extends WebIMTestBase {
	private static final Logger logger = LoggerFactory.getLogger(FirefoxTest.class);

	private String username2;
	private String password2;
	private String nickname2;
	private String msg;
	private WebDriver driver2;
	private String imgPath = "src/main/resources/test_img.png";
	private String audioPath = "src/main/resources/test_audio.mp3";
	private String filePath = "src/main/resources/test_file.txt";

	public static String IMG_TYPE = "img";
	public static String AUDIO_TYPE = "audio";
	public static String FILE_TYPE = "file";

	@BeforeClass(alwaysRun = true)
	public void beforeClass() {
		logger.info("Start to webim auto test on firefox...");
		init();
		driver = new FirefoxDriver();
	}

	@Test(enabled = true, priority = -100)
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

	@Test(enabled = true)
	public void loginWebIM() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		super.login(driver, username, password, path, isGetBaseUrl);
	}

	@Test(enabled = true, dependsOnMethods = { "loginWebIM", "register" })
	public void addFriend() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
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
	}

	@Test(enabled = true, dependsOnMethods = { "addFriend" })
	public void getFriendList() {
		logger.info("get friend list");
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		String xpath = "//ul[@id='contactlistUL']";
		WebElement ele = findElement(driver, xpath, path);
		List<WebElement> wl = ele.findElements(By.xpath("//li"));
		Assert.assertTrue(null != wl && wl.size() > 0, "have found friends");
	}

	@Test(enabled = true, dependsOnMethods = { "getFriendList" })
	public void loginWebIMWithNewUser() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		driver2 = new FirefoxDriver();
		super.login(driver2, username2, password2, path, true);
	}

	@Test(enabled = true, dependsOnMethods = { "loginWebIMWithNewUser" })
	public void receiveAddFriendConfirmMsg() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		String xpath = "//button[@class='btn btn-primary confirmButton']";
		WebElement ele = findElement(driver2, xpath, path);
		ele.click();
		sleep(3);
		logger.info("find new friend: {}", username);
		findSpecialFriend(driver2, username, path);
		logger.info("quit driver");
		if (null != driver2) {
			try {
				driver2.quit();
			} catch (Exception e) {
				logger.error("Failed to quit driver2:", e);
			}
		}
	}

	@Test(enabled = true, dependsOnMethods = { "receiveAddFriendConfirmMsg" })
	public void sendOffLineMsg() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		WebElement ele = findSpecialFriend(driver, username2, path);
		sleep(3);
		logger.info("find message text area");
		String xpath = "//textarea[@id='talkInputId']";
		ele = findElement(driver, xpath, path);
		msg = getRandomStr(10);
		logger.info("talk to friend: {} with message: {}", username2, msg);
		ele.clear();
		ele.sendKeys(msg);
		logger.info("send msg");
		xpath = "//li/img[@onclick='sendText()']";
		ele = findElement(driver, xpath, path);
		ele.click();
		sleep(3);
		checkChatMsg(driver, username, username2, msg, path);
	}

	@Test(enabled = true, dependsOnMethods = { "sendOffLineMsg" })
	public void receiveOffLineMsg() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		driver2 = new FirefoxDriver();
		super.login(driver2, username2, password2, path, true);
		logger.info("find special friend: {}", username);
		findSpecialFriend(driver2, username, path);
		sleep(3);
		checkChatMsg(driver2, username2, username, msg, path);
	}

	@Test(enabled = true, dependsOnMethods = { "receiveOffLineMsg" })
	public void sendOnLineMsg() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		super.login(driver, username, password, path, isGetBaseUrl);
		logger.info("find special friend: {}", username2);
		WebElement ele = findSpecialFriend(driver, username2, path);
		sleep(3);
		logger.info("find message text area");
		String xpath = "//textarea[@id='talkInputId']";
		ele = findElement(driver, xpath, path);
		msg = getRandomStr(10);
		logger.info("talk to friend: {} with message: {}", username2, msg);
		ele.sendKeys(msg);
		logger.info("send msg");
		xpath = "//li/img[@onclick='sendText()']";
		ele = findElement(driver, xpath, path);
		ele.click();
		sleep(3);
		checkChatMsg(driver, username, username2, msg, path);
	}

	@Test(enabled = true, dependsOnMethods = { "sendOnLineMsg" })
	public void receiveOnLineMsg() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		logger.info("find special friend: {}", username);
		findSpecialFriend(driver2, username, path);
		sleep(3);
		checkChatMsg(driver2, username2, username, msg, path);
		logger.info("quit driver");
		if (null != driver2) {
			try {
				driver2.quit();
			} catch (Exception e) {
				logger.error("Failed to quit driver2:", e);
			}
		}
	}

	@Test(enabled = true, dependsOnMethods = { "receiveOnLineMsg" })
	public void sendOffLineImg() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		logger.info("send image file: {} to friend: {}", imgPath, username2);
		String[] sp = imgPath.split("/");
		String fp = sp[sp.length - 1];
		String data_type = "img";
		sendFile(driver, imgPath, data_type, path);
		sleep(3);
		logger.info("Check image file: {} has been send", imgPath);
		checkChatMsg(driver, username, username2, fp, path);
	}

	@Test(enabled = true, dependsOnMethods = { "sendOffLineImg" })
	public void receiveOffLineImg() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		driver2 = new FirefoxDriver();
		super.login(driver2, username2, password2, path, true);
		logger.info("find special friend: {}", username);
		findSpecialFriend(driver2, username, path);
		String[] sp = imgPath.split("/");
		String fp = sp[sp.length - 1];
		logger.info("Check image file: {} has been received", imgPath);
		checkChatMsg(driver2, username2, username, fp, path);
		logger.info("quit driver");
		if (null != driver2) {
			try {
				driver2.quit();
			} catch (Exception e) {
				logger.error("Failed to quit driver2:", e);
			}
		}
	}

	@Test(enabled = true, dependsOnMethods = { "receiveOffLineImg" })
	public void sendOffLineAudio() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		logger.info("send image file: {} to friend: {}", audioPath, username2);
		String[] sp = audioPath.split("/");
		String fp = sp[sp.length - 1];
		String data_type = "audio";
		sendFile(driver, audioPath, data_type, path);
		sleep(3);
		logger.info("Check audio file: {} has been send", audioPath);
		checkChatMsg(driver, username, username2, fp, path);
	}

	@Test(enabled = true, dependsOnMethods = { "sendOffLineAudio" })
	public void receiveOffLineAudio() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		driver2 = new FirefoxDriver();
		super.login(driver2, username2, password2, path, true);
		logger.info("find special friend: {}", username);
		findSpecialFriend(driver2, username, path);
		String[] sp = audioPath.split("/");
		String fp = sp[sp.length - 1];
		logger.info("Check audio file: {} has been received", audioPath);
		checkChatMsg(driver2, username2, username, fp, path);
		logger.info("quit driver");
		if (null != driver2) {
			try {
				driver2.quit();
			} catch (Exception e) {
				logger.error("Failed to quit driver2:", e);
			}
		}
	}

	@Test(enabled = true, dependsOnMethods = { "receiveOffLineAudio" })
	public void sendOffLineFile() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		logger.info("find special friend: {}", username2);
		findSpecialFriend(driver, username2, path);
		logger.info("send txt file: {} to friend: {}", filePath, username2);
		String[] sp = filePath.split("/");
		String fp = sp[sp.length - 1];
		String data_type = "file";
		sendFile(driver, filePath, data_type, path);
		sleep(3);
		logger.info("Check txt file: {} has been send", filePath);
		checkChatMsg(driver, username, username2, fp, path);
	}

	@Test(enabled = true, dependsOnMethods = { "sendOffLineFile" })
	public void receiveOffLineFile() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		driver2 = new FirefoxDriver();
		super.login(driver2, username2, password2, path, true);
		logger.info("find special friend: {}", username);
		findSpecialFriend(driver2, username, path);
		String[] sp = filePath.split("/");
		String fp = sp[sp.length - 1];
		logger.info("Check txt file: {} has been received", filePath);
		checkChatMsg(driver2, username2, username, fp, path);
		logger.info("quit driver");
		if (null != driver2) {
			try {
				driver2.quit();
			} catch (Exception e) {
				logger.error("Failed to quit driver2:", e);
			}
		}
	}

	@Test(enabled = true, dependsOnMethods = { "receiveOffLineFile" }, priority = 100)
	public void getGroupList() {
		logger.info("get group list");
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		String xpath = "//ul[@id='contracgrouplistUL']";
		WebElement ele = findElement(driver, xpath, path);
		List<WebElement> li = ele.findElements(By.xpath("//li"));
		Assert.assertTrue(null != li && li.size() > 0, "have found groups");
	}

	@Test(enabled = true, dependsOnMethods = { "getGroupList" })
	public void sendGroupMessage() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		logger.info("select first group to send message");
		WebElement ele = findSpecialGroup(driver, null, path);
		String groupId = ele.getAttribute("id");
		logger.info("find text area for send message");
		String xpath = "//textarea[@id='talkInputId']";
		ele = findElement(driver, xpath, path);
		ele.click();
		msg = "webim_test_sendgroupmessage" + getRandomStr(10);
		ele.clear();
		ele.sendKeys(msg);
		xpath = "//img[@onclick='sendText()']";
		logger.info("click send button");
		ele = findElement(driver, xpath, path);
		ele.click();
		sleep(3);
		logger.info("Check group message: {} has been send", msg);
		checkChatMsg(driver, username, groupId, msg, path);
	}

	@Test(enabled = true, dependsOnMethods = { "sendGroupMessage" })
	public void getChatroomList() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		logger.info("get chatroom list");
		String xpath = "//a[@id='accordion4']";
		WebElement ele = findElement(driver, xpath, path);
		if (ele.getAttribute("class").equals("accordion-toggle collapsed")) {
			ele.click();
			sleep(1);
		}
		xpath = "//ul[@id='chatRoomListUL']";
		ele = findElement(driver, xpath, path);
		List<WebElement> wes = ele.findElements(By.xpath("//li"));
		Assert.assertTrue(null != wes && wes.size() > 0, "have found chatrooms");
	}

	@Test(enabled = true, dependsOnMethods = { "getChatroomList" })
	public void sendchatmessage() {
		String path = getScreenshotPath(Thread.currentThread().getStackTrace()[1].getMethodName());
		logger.info("select first chatroom to send message");
		WebElement ele = findSpecialChatroom(driver, null, path);
		String chatroomId = ele.getAttribute("id");
		logger.info("find text area for send message");
		String xpath = "//textarea[@id='talkInputId']";
		ele = findElement(driver, xpath, path);
		ele.click();
		msg = "webim_test_sendchatroommessage" + getRandomStr(10);
		ele.clear();
		ele.sendKeys(msg);
		xpath = "//img[@onclick='sendText()']";
		logger.info("click send button");
		ele = findElement(driver, xpath, path);
		ele.click();
		sleep(3);
		// logger.info("Check chatroom message: {} has been send", msg);
		// checkChatMsg(driver, username, chatroomId, msg, path);
	}

	@Test(enabled = true, dependsOnMethods = { "sendchatmessage" })
	public void deleteFriend() {
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

	@Test(enabled = true, dependsOnMethods = { "deleteFriend" }, priority = 100)
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

		if (null != driver2) {
			try {
				driver2.quit();
			} catch (Exception e) {
				logger.error("Failed to quit driver2:", e);
			}
		}
	}
}
