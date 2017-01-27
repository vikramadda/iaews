package org.iae.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

public class UploadController {

	private static final Logger logger = LoggerFactory.getLogger(UploadController.class);
	
	private static String UPLOADED_FOLDER = "/tmp";

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public ResponseEntity<String> fileUpload(@RequestParam("file") MultipartFile file, 
			RedirectAttributes redirectAttributes) {

		if (file.isEmpty()) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Please select a file to upload");
		}

		try {
			// Get the file and save it somewhere
			byte[] bytes = file.getBytes();
			Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
			Files.write(path, bytes);

			return ResponseEntity
		            .status(HttpStatus.OK)
		            .body("You successfully uploaded '" + file.getOriginalFilename() + "'");

		} catch (IOException e) {
			logger.error("Exit from upload() method");
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Failed to upload '" + file.getOriginalFilename() + "'");
		}
	}
}