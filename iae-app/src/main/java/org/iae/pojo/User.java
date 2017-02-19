package org.iae.pojo;

import java.io.IOException;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.iae.util.JsonUtil;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
    
	private String name;
	private String password;
	private String mobile;
	private String email;
	private Integer role;

	@Column(name="securityquestions")
	private String securityQuestions;
	
	@Transient
	private String confirmPassword;

	@Transient
	private List<SecurityQuestion> securityQuestionList;

	@Transient
	ObjectMapper om = new ObjectMapper();
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getRole() {
		return role;
	}
	public void setRole(Integer role) {
		this.role = role;
	}
	public String getConfirmPassword() {
		return confirmPassword;
	}
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	
	public List<SecurityQuestion> getSecurityQuestionList() {
		
		try {
			securityQuestionList = om.readValue(securityQuestions, new TypeReference<List<SecurityQuestion>>(){});
		} catch (IOException e) {}
		
		return securityQuestionList;
	}
	
	public void setSecurityQuestionList(List<SecurityQuestion> securityQuestionList) {
		this.securityQuestionList = securityQuestionList;
		securityQuestions = JsonUtil.getJson(securityQuestionList);
	}
}
