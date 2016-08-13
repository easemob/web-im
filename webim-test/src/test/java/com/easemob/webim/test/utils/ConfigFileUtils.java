package com.easemob.webim.test.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.easemob.webim.test.exception.WebIMAutoTestException;

public class ConfigFileUtils {
	private static final Logger logger = LoggerFactory.getLogger(ConfigFileUtils.class);
	public static void changeConfigFile(String filename, String xmpp, String urlapi, String appkey) {
		logger.info("Start to change configuration file: {}", filename);
		writeFile(filename, changeConfigFileStr(filename,xmpp, urlapi, appkey));
	}
	
	public static StringBuffer readFile(String filename) {
		Path path = Paths.get(filename);
		StringBuffer sb = new StringBuffer();
		try (Stream<String> lines = Files.lines(path)) {
			lines.forEachOrdered(s -> sb.append(s).append(System.getProperty("line.separator")));
		} catch (Exception e) {
			throw new WebIMAutoTestException("Failed to read file: " + filename,e);
		}
		return sb;
	}
	
	public static void writeFile(String filename, StringBuffer sb) {
		try {
			logger.info("write file: {} with string: {}", filename, sb.toString());
			Files.write(Paths.get(filename), sb.toString().getBytes("utf-8"), StandardOpenOption.WRITE);
		} catch (IOException e) {
			throw new WebIMAutoTestException("Failed to write file: " + filename,e);
		}
	}
	
	public static StringBuffer changeConfigFileStr(String filename, String xmpp, String urlapi, String appkey) {
		logger.info("change file: {} with xmpp: {}, urlapi: {}, appkey: {}", filename, xmpp, urlapi, appkey);
		Path path = Paths.get(filename);
		StringBuffer sb = new StringBuffer();
		try (Stream<String> lines = Files.lines(path)) {
			lines.forEach(s -> {
				s = replaceConfig(s, xmpp, urlapi, appkey);
				sb.append(s).append(System.getProperty("line.separator"));
			});
		} catch (Exception e) {
			throw new WebIMAutoTestException("Failed to read file: " + filename,e);
		}
		return sb;
	}
	
	private static String replaceConfig(String line, String xmpp, String urlapi, String appkey) {
		if (line.contains("xmppURL: ")) {
			return line.replaceAll("'.*',", "'" + xmpp + "',");
		}
		if (line.contains("apiURL: protocol + '//")) {
			return line.replaceAll("'//.*',", "'//" + urlapi + "',");
		}
		if (line.contains("appkey: ")) {
			return line.replaceAll("\".*\",", "\"" + appkey + "\",");
		}
		return line;
	}
}
