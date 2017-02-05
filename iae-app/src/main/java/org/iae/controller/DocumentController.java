package org.iae.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.iae.exception.ObjectNotFoundException;
import org.iae.pojo.Document;
import org.iae.service.DocumentService;
import org.iae.util.IAEContants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
public class DocumentController {

	private static final Logger logger = LoggerFactory.getLogger(DocumentController.class);
	
	private static String UPLOADED_FOLDER = "";
	
	@Autowired
	private DocumentService documentService;

	/*
	 * Single of multiple files for a type like activity, project.
	 * TypeName will be the name of the activity or project,
	 * so that, create a folder if not exist with project name or activity name.
	 * 
	 */
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public ResponseEntity<String> fileUpload(@RequestParam("file") MultipartFile[] files, 
			@RequestParam("type") String type, @RequestParam("name") String typeName,  
			RedirectAttributes redirectAttributes) {

		if (files.length == 0) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Please select a file to upload");
		}

		if(type != null) {
			switch(type) {
			case IAEContants.TYPE_PROJECT : UPLOADED_FOLDER = IAEContants.PROJECT_DOCS_LOC + File.separator + typeName ; break;
			case IAEContants.TYPE_ACTIVITY : UPLOADED_FOLDER = IAEContants.ACTIVITY_DOCS_LOC + File.separator + typeName ; break;
			}
		} else {
			UPLOADED_FOLDER = IAEContants.DOCS_LOC;
		}
		
		File dir = new File(UPLOADED_FOLDER);

		List<String> fileNames = new ArrayList<>();
		
		if (!dir.exists())
			dir.mkdirs();

		for (int i = 0; i < files.length; i++) {

			MultipartFile file = files[i];

			try {
				// Get the file and save it somewhere
				byte[] bytes = file.getBytes();

				Path path = Paths.get(dir.getAbsolutePath() + File.separator + file.getOriginalFilename());
				Files.write(path, bytes);

				fileNames.add(file.getOriginalFilename());
				
			} catch (IOException e) {
				logger.error("Exception while uploading file");
				return ResponseEntity
						.status(HttpStatus.BAD_REQUEST)
						.body("Failed to upload '" + file.getOriginalFilename() + "'");
			}
		}
		
		redirectAttributes.addAttribute(IAEContants.PARAM_FILE_NAMES, fileNames);
		redirectAttributes.addAttribute(IAEContants.PARAM_FILE_PATH, dir.getAbsolutePath());
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body("You successfully uploaded the file");
	}
	
	@RequestMapping(value = "/download/{docName}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Resource> fileDownload(@PathVariable String docName) {

		HttpHeaders headers = new HttpHeaders();

		Document document = null;

		try {
			document = documentService.downloadDocument(docName);
		} catch (ObjectNotFoundException e1) {
			e1.printStackTrace();
		}

		Resource resource = new FileSystemResourceLoader().getResource(document.getLocation() + File.separator + docName);

		//new ServletContextResource(servletContext, document.getLocation());

		//new ByteArrayResource()

		//new FileSystemResourceLoader().getResource("O:\\Docs\\New Docs\\AM_performance.xlsx");

		try {
			String contentType = Files.probeContentType(Paths.get(resource.getFile().getAbsolutePath()));
			headers.add("Content-Type", contentType);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);

	}
}