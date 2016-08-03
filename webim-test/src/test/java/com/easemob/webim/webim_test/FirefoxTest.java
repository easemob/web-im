package com.easemob.webim.webim_test;

import org.openqa.selenium.Alert;
import org.openqa.selenium.JavascriptExecutor;
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
		username2 = "webim_test_" + getRandomStr(6);
		password2 = "123456";
		nickname2 = "webim_nick_" + getRandomStr(8);
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
		super.login(driver, username2, password2, path);
		super.logout(driver, path);
	}

	@Test(enabled = true, groups = { "sanity_test" })
	public void loginWebIM() {
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
		super.login(driver, username, password, path);
	}

	@Test(enabled = true, groups = { "sanity_test" }, dependsOnMethods = { "loginWebIM" }, priority = 100)
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
				logger.error("Catch exception:", e);
			}
		}
	}
}
