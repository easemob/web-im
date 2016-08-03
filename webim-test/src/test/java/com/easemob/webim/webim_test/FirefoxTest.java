package com.easemob.webim.webim_test;

import java.io.File;
import org.apache.commons.lang3.StringUtils;
import java.util.List;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
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

	@Test(enabled = true, groups = { "sanity_test" }, priority = -100)
	public void register() {
		Preconditions.checkArgument(null != driver, "webdriver was missing");
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" })
	public void loginWebIM() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
		super.login(driver, username, password, path, isGetBaseUrl);
	}
	@Test(enabled = true, groups = { "sanity_test" },dependsOnMethods = { "loginWebIM" })
	public void sendGroupMessage(){
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
		logger.info("send message");
		String xpath="//li[@id='groupchat226110031353872832']";
		WebElement ele = findElement(driver, xpath, path);
		logger.info("begin send message");
		xpath="//textarea[@id='talkInputId']";
		ele=findElement(driver, xpath, path);
		ele.click();
		String message="webim_test_sendgroupmessage" + getRandomStr(6);
		ele.sendKeys(message);
		xpath="//img[@onclick='sendText()']";
		ele=findElement(driver, xpath, path);
		ele.click();
		xpath="//p[@class='chat-content-p3']";
		ele=findElement(driver, xpath, path);
		String get_message=ele.getText();
		Assert.assertEquals(get_message, message);
		logger.info("finish send messages");
		
	}
	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "loginWebIM" }, priority = 100)
	public void getFriendList(){
		logger.info("get friend list");
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
		
		String xpath="//ul[@id='contactlistUL']";
		WebElement ele = findElement(driver, xpath, path);
		List<WebElement> wl = ele.findElements(By.xpath("//li"));
		Assert.assertTrue(null != wl && wl.size() > 0, "have found friends");
		sleep(3);
	}
	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "loginWebIM" }, priority = 100)
	public void getGroupList(){
		logger.info("get group list");
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
		
		String xpath="//ul[@id='contracgrouplistUL']";
		WebElement ele = findElement(driver, xpath, path);
		List<WebElement> li = ele.findElements(By.xpath("//li"));
		Assert.assertTrue(null != li && li.size() > 0, "have found groups");
		sleep(3);
	}
	

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "loginWebIM", "register" })
	public void addFriend() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "addFriend" })
	public void loginWebIMWithNewUser() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
		driver2 = new FirefoxDriver();
		super.login(driver2, username2, password2, path, true);
	}

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "loginWebIMWithNewUser" })
	public void receiveAddFriendConfirmMsg() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
		String xpath = "//button[@class='btn btn-primary confirmButton']";
		WebElement ele = findElement(driver2, xpath, path);
		ele.click();
		sleep(3);
		logger.info("find new friend: {}", username);
		xpath = "//ul[@id='contactlistUL']/li[@id='" + username + "']";
		ele = findElement(driver2, xpath, path);

		logger.info("quit driver");
		if (null != driver2) {
			try {
				driver2.quit();
			} catch (Exception e) {
				logger.error("Failed to quit driver2:", e);
			}
		}
	}

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "receiveAddFriendConfirmMsg" })
	public void sendOffLineMsg() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "sendOffLineMsg" })
	public void receiveOffLineMsg() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
		driver2 = new FirefoxDriver();
		super.login(driver2, username2, password2, path, true);
		logger.info("find special friend: {}", username);
		findSpecialFriend(driver2, username, path);
		sleep(3);
		checkChatMsg(driver2, username2, username, msg, path);
	}

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "receiveOffLineMsg" })
	public void sendOnLineMsg() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "sendOnLineMsg" })
	public void receiveOnLineMsg() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "receiveOnLineMsg" })
	public void sendOffLineImg() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "sendOffLineImg" })
	public void receiveOffLineImg() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "receiveOffLineImg" })
	public void sendOffLineAudio() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "sendOffLineAudio" })
	public void receiveOffLineAudio() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "receiveOffLineAudio" })
	public void sendOffLineFile() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "sendOffLineFile" })
	public void receiveOffLineFile() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "receiveOffLineFile" })
	public void deleteUser() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "deleteUser" }, priority = 100)
	public void logoutWebIM() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
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
