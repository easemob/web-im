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
import org.testng.annotations.Test;

import com.google.common.base.Preconditions;

@Test(suiteName = "WebIM_Base_Test", testName = "WebIM_Base_Test_on_Firefox", groups = {"Firefox_Group"})
public class FirefoxTest extends WebIMTestBase {
	private static final Logger logger = LoggerFactory.getLogger(FirefoxTest.class);

	@BeforeClass(alwaysRun = true)
	public void beforeClass() {
		logger.info("Start to webim auto test on firefox...");
		driver = new FirefoxDriver();
	}

	@Test(dependsOnMethods = { "register" })
	public void login() {
		String username = "zhouhuhu";
		String password = "qQ123456";
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
		super.login(driver, username, password, path);
//		try {
//			driver.close();
//		} catch (Exception e) {
//			logger.error("catch exception:", e);
//			WebElement ele = driver.switchTo().activeElement();
//			ele.click();
//		}
		try {
			sleep(3);
			JavascriptExecutor oJavaScriptExecutor = (JavascriptExecutor)driver;
			oJavaScriptExecutor.executeScript("window.open();");
		} catch (Exception e) {
			logger.error("catch error: ", e);
		}
	}

	@Test(enabled = true)
	public void register() {
		Preconditions.checkArgument(null != driver, "webdriver was missing");
		String path = screenshotPath + "/" + Thread.currentThread().getStackTrace()[1].getMethodName();
		String username = getRandomStr(8);
		String password = getRandomStr(8);
		String nickname = getRandomStr(8);
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
		ele.sendKeys(username);

		xpath = "//input[@id='regist_password']";
		ele = findElement(driver, xpath, path);
		ele.sendKeys(password);

		xpath = "//input[@id='regist_nickname']";
		ele = findElement(driver, xpath, path);
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
		isGetBaseUrl = false;
		super.login(driver, username, password, path);
		super.logout(driver, path);
	}

	@AfterClass(alwaysRun = true)
	public void afterClass() {
		logger.info("End to webim auto test on firefox... ");
		if (null != driver) {
			try {
				driver.quit();
			} catch (Exception e) {
				logger.error("Catch exception:",e);
			}
		}
	}
}
