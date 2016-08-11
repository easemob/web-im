package com.easemob.webim.test.utils;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Preconditions;

public class VelocityUtils {
	private static final Logger logger = LoggerFactory.getLogger(VelocityUtils.class);
	private static final VelocityEngine ve = new VelocityEngine();
	static {
//		ve.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
//		ve.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
		ve.init();
	}
	
	public static String merge(String file, Map<String, Object> map) throws IOException {
		Preconditions.checkArgument(null != file, "template file path was missing");
		Preconditions.checkArgument(null != map && map.size() > 0, "properites map was blank");
		VelocityContext context = new VelocityContext();
		for (String k : map.keySet()) {
			context.put(k, map.get(k));
		}
//		File f = new File(file);
		Template template = ve.getTemplate(file);
		StringWriter writer = new StringWriter();
		template.merge(context, writer);
		writer.close();
		return writer.toString();
	}
}
