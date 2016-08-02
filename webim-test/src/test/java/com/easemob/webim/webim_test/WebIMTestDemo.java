package com.easemob.webim.webim_test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.safari.SafariDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class WebIMTestDemo {
	WebDriver driver = null;

	@BeforeClass(alwaysRun = true)
	public void beforeClass() {
		// driver = new FirefoxDriver();
		// driver = new SafariDriver();
		// System.setProperty("webdriver.chrome.drive", "");
		// driver = new ChromeDriver();
	}

	@Test(enabled = false, groups = { "success" })
	public void loginWebIM() throws InterruptedException {
		driver.get("http://webim.easemob.com/");
		driver.manage().window().maximize();
		String xpath = "//input[@id='username']";
		WebElement username = findElementByXpath(driver, xpath);
		Assert.assertNotNull(username);
		username.sendKeys("zhouhuhu");

		xpath = "//input[@id='password']";
		WebElement password = findElementByXpath(driver, xpath);
		Assert.assertNotNull(password);
		password.sendKeys("qQ123456");

		xpath = "//div[@id='loginmodal']/div[3]/button[1]";
		WebElement login = findElementByXpath(driver, xpath);
		Assert.assertNotNull(login);
		login.click();
		Thread.currentThread().sleep(3000L);

		xpath = "//li[@id='jackson1']/span";
		WebElement jackson1 = findElementByXpath(driver, xpath);
		if (null == jackson1) {
			xpath = "//a[@id='accordion1']";
			WebElement myFriend = findElementByXpath(driver, xpath);
			Assert.assertNotNull(login);
			myFriend.click();
			Thread.currentThread().sleep(3000L);

			xpath = "//li[@id='jackson1']/span";
			jackson1 = findElementByXpath(driver, xpath);
			Assert.assertNotNull(jackson1);
		}
		jackson1.click();
		Thread.currentThread().sleep(3000L);

		xpath = "//textarea[@id='talkInputId']";
		WebElement talk = findElementByXpath(driver, xpath);
		Assert.assertNotNull(talk);
		talk.sendKeys("你好！请问有什么能帮助你的？[):]");
		Thread.currentThread().sleep(3000L);

		xpath = "//div[@id='content']/div[3]/div[2]/div[3]/ul/li/img";
		WebElement sendMsg = findElementByXpath(driver, xpath);
		Assert.assertNotNull(sendMsg);
		sendMsg.click();
		Thread.currentThread().sleep(3000L);

		xpath = "//div[@id='headerimg']/span[3]/div/button";
		WebElement add = findElementByXpath(driver, xpath);
		Assert.assertNotNull(add);
		add.click();
		// Select select = new Select(addFriend);
		Thread.currentThread().sleep(3000L);

		xpath = "//div[@id='headerimg']/span[3]/div/ul/li[1]/a";
		WebElement addFriend = findElementByXpath(driver, xpath);
		Assert.assertNotNull(addFriend);
		addFriend.click();
		Thread.currentThread().sleep(3000L);

		xpath = "//input[@id='addfridentId']";
		WebElement addFriendId = findElementByXpath(driver, xpath);
		Assert.assertNotNull(addFriendId);
		addFriendId.sendKeys("anyuser");
		Thread.currentThread().sleep(3000L);

		xpath = "//button[@id='addFridend']";
		WebElement addFriendBtn = findElementByXpath(driver, xpath);
		Assert.assertNotNull(addFriendBtn);
		addFriendBtn.click();
		Thread.currentThread().sleep(3000L);
	}

	@Test(enabled = false, groups = { "failed" })
	public void failedLogin() throws InterruptedException {
		driver.get("http://webim.easemob.com/");
		driver.manage().window().maximize();
		Thread.currentThread().sleep(3000L);
		String xpath = "//input[@id='username']";
		WebElement username = findElementByXpath(driver, xpath);
		Assert.assertNotNull(username);
		username.sendKeys("zhouhuhu");

		xpath = "//input[@id='password']";
		WebElement password = findElementByXpath(driver, xpath);
		Assert.assertNotNull(password);
		password.sendKeys("qQ123456");
		Thread.currentThread().sleep(3000L);

		xpath = "//div[@id='loginmodal']/div[3]/button[1]";
		WebElement login = findElementByXpath(driver, xpath);
		Assert.assertNotNull(login);
		login.click();
		Thread.currentThread().sleep(3000L);

		xpath = "//li[@id='chenglong1']/span";
		WebElement chenglong1 = findElementByXpath(driver, xpath);
		Assert.assertNotNull(chenglong1, "web element chenglong1");
	}

	@AfterClass(alwaysRun = true)
	public void afterClass() {
		driver.close();
	}

	private WebElement findElementByXpath(WebDriver driver, String xpath) {
		WebElement element = null;
		try {
			element = driver.findElement(By.xpath(xpath));
		} catch (Exception e) {
			return null;
		}
		return element;
	}
}
