package org.iae.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Project;
import org.iae.service.ProjectService;
import org.iae.util.IAEContants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path="/project")
public class ProjectController {

	private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);
	
	private static String UPLOADED_FOLDER = "";
	
	@Autowired
	private ProjectService projectService;

    @RequestMapping(path="/add", method=RequestMethod.POST)
    public ResponseEntity<Object> addProject(@RequestBody Project project/*, @RequestParam("file") MultipartFile[] files*/) {
    	logger.debug("Entered into addProject()");

    	Project udpatedProject = null;

    	if(project == null) {
    		return ResponseEntity
    				.status(HttpStatus.EXPECTATION_FAILED)
    				.body("Invalid Data, Project details are expected");
    	}

    	try {
    		//setImagesToProject(project, files);
    		udpatedProject = projectService.addProject(project);
    	} catch(OperationFailedException e) {
    		return ResponseEntity
    				.status(HttpStatus.BAD_REQUEST)
    				.body("Unable to add Project due to " + e.getMessage());
    	}

    	logger.debug("Exit from addProject()");

    	return ResponseEntity
    			.status(HttpStatus.OK)
    			.body(udpatedProject);
    }

 @RequestMapping(path="/update", method=RequestMethod.POST)
 public ResponseEntity<String> updateProject(@RequestBody Project project/*, @RequestParam("file") MultipartFile[] files*/) {
	
		logger.debug("Entered into updateProject()");

		if(project == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Invalid Data, Project details are expected");
		}
		
		try {
    	//setImagesToProject(project, files);
			projectService.updateProject(project);
		} catch(OperationFailedException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Unable to update project due to " + e.getMessage());
		} catch(ObjectNotFoundException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Project not found to update. Project name : " + project.getName());
		}
		
		logger.debug("Exit from updateProject()");
		
		return ResponseEntity
	            .status(HttpStatus.OK)
	            .body("Update Project successful");
	}

    @RequestMapping(path="/all", method=RequestMethod.GET)
    public ResponseEntity<Object> getAllProjects() {

    	logger.debug("Entered into getAllProjects()");

    	List<Project> projects = projectService.getAllProjects();

    	logger.debug("Exit from getAllProjects()");

    	if(projects != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(projects);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No projects available");	
    	}
    }

    @RequestMapping(path="/id/{projectId}", method=RequestMethod.GET)
    public ResponseEntity<Object> getProjectById(@PathVariable Long projectId) {

    	logger.debug("Entered into getProjectById(), project id {} ", projectId);

    	if(projectId == null) {
    		return ResponseEntity
    				.status(HttpStatus.EXPECTATION_FAILED)
    				.body("Expected Status");
    	}

    	Project project = projectService.getProjectById(projectId);

    	logger.debug("Exit from getProjectById()");

    	if(project != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(project);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No Project found with id " + projectId);
    	}
    }

    @RequestMapping(path="/status/{status}", method=RequestMethod.GET)
    public ResponseEntity<Object> getAllProjectsByStatus(@PathVariable String status) {

    	logger.debug("Entered into getAllProjectsByStatus(), status {} ", status);

    	if(status == null) {
    		return ResponseEntity
    				.status(HttpStatus.EXPECTATION_FAILED)
    				.body("Expected Status");
    	}

    	List<Project> projects = projectService.getAllProjectsByStatus(status);

    	logger.debug("Exit from getAllProjectsByStatus()");

    	if(projects != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(projects);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No Projects found with status " + status);
    	}
    }

    @RequestMapping(path="projectId/{projectId}", method=RequestMethod.GET)
    public ResponseEntity<Object> getProjectById(@PathVariable String projectId) {

    	logger.debug("Entered into getProjectById(), ID {} ", projectId);

    	if(projectId == null) {
    		return ResponseEntity
    				.status(HttpStatus.EXPECTATION_FAILED)
    				.body("Expected project name");
    	}

    	Project project = projectService.getProjectById(Long.parseLong(projectId));

    	logger.debug("Exit from getProjectByName()");

    	if(project != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(project);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No project found with " + projectId);
    	}
    }
 
    private ResponseEntity<Object> setImagesToProject(Project project, MultipartFile[] files) {
    	
    	UPLOADED_FOLDER = IAEContants.PROJECT_DOCS_LOC + File.separator + project.getName() ;

    	File dir = new File(UPLOADED_FOLDER);

    	if (!dir.exists())
    		dir.mkdirs();

    	for (int i = 0; i < files.length; i++) {

    		MultipartFile file = files[i];

    		try {
    			// Get the file and save it somewhere
    			byte[] bytes = file.getBytes();

    			Path path = Paths.get(dir.getAbsolutePath() + File.separator + file.getOriginalFilename());
    			Files.write(path, bytes);

    			project.setLogoLocWithName(dir.getAbsolutePath() + File.separator + file.getOriginalFilename());

    		} catch (IOException e) {
    			logger.error("Exception while uploading file");
    			return ResponseEntity
    					.status(HttpStatus.BAD_REQUEST)
    					.body("Failed to upload '" + file.getOriginalFilename() + "'");
    		}
    	}

		return ResponseEntity
				.status(HttpStatus.OK)
				.body("Upload Success");
    	
    }
    
/*    private void setImagesToProject(Project project, HttpServletRequest request) {

    	String[] fileNamesArray = request.getParameterMap().get(IAEContants.PARAM_FILE_NAMES);
		
		if(fileNamesArray != null) {
			List<String> fileNames = Arrays.asList(fileNamesArray);	
			String logoLocWithFileName = request.getParameter(IAEContants.PARAM_FILE_PATH) + File.separator + fileNames.get(0);
			project.setLogoLocWithName(logoLocWithFileName);
		}
    }*/
}