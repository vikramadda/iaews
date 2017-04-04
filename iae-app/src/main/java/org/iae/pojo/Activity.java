package org.iae.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="activities")
public class Activity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String description;
	
	@Temporal(TemporalType.DATE)
	@Column(name="startdate")
	private Date startDate;
	
	@Temporal(TemporalType.DATE)
	@Column(name="enddate")
	private Date endDate;
	
	@Column(name="actbudget")
	private Integer actBudget;
	
	@Column(name="estbudget")
	private Integer estBudget;
	private String status;
	@Column(name="logo")
	private String logoLocWithName;
	@Column(name="projectid")
	private Long projectId;
	
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public Integer getActBudget() {
		return actBudget;
	}
	public void setActBudget(Integer actBudget) {
		this.actBudget = actBudget;
	}
	public Integer getEstBudget() {
		return estBudget;
	}
	public void setEstBudget(Integer estBudget) {
		this.estBudget = estBudget;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getLogoLocWithName() {
		return logoLocWithName;
	}
	public void setLogoLocWithName(String logoLocWithName) {
		this.logoLocWithName = logoLocWithName;
	}
	public Long getProjectId() {
		return projectId;
	}
	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

}
