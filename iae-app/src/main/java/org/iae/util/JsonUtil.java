package org.iae.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {

	private static final Logger logger = LoggerFactory.getLogger(JsonUtil.class);

	private static final ObjectMapper om = new ObjectMapper();
	
	public static String getJson(Object input) {
		try {
			return om.writeValueAsString(input);
		} catch (JsonProcessingException e) {
			logger.error("Exception in generating JSON :{} ", e.getMessage());
		}
		return null;
	}
}