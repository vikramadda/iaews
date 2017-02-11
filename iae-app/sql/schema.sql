--Roles table
CREATE TABLE roles (
  id bigint(50) NOT NULL auto_increment,
  name varchar(80) default NULL,
  description varchar(80) default NULL,
  PRIMARY KEY  (id),
  UNIQUE KEY uc_rolename (name),
  KEY idx_rolename (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--Users table
CREATE TABLE users (
  id int(20) NOT NULL auto_increment,
  name varchar(20) NOT NULL,
  mobile varchar(15) NOT NULL,
  password varchar(80) NOT NULL,
  email varchar(50) default NULL,
  role int(20) NOT NULL,
  securityquestions varchar(200) default NULL,
  PRIMARY KEY  (id),
  UNIQUE KEY uc_username (name),
  FOREIGN KEY (role) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--Security Questions table
CREATE TABLE securityquestions (
  id int(80) NOT NULL auto_increment,
  name varchar(80) default NULL,
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--Documents table
CREATE TABLE docs (
  id INT(10) NOT NULL AUTO_INCREMENT,
  NAME VARCHAR(20) NOT NULL,
  description VARCHAR(80) DEFAULT NULL,
  doctype VARCHAR(255) DEFAULT NULL,
  location VARCHAR(128) NOT NULL,
  PRIMARY KEY  (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

--Donations table
CREATE TABLE donations (
  id int(20) NOT NULL auto_increment,
  donorname varchar(50) default NULL,
  panno varchar(10) default NULL,
  amount int(20) default NULL,
  donationdate datetime default NULL,
  currency varchar(20) default NULL,
  address varchar(90) default NULL,
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--Projects table
CREATE TABLE projects (
  id int(20) NOT NULL auto_increment,
  name varchar(80) NOT NULL,
  description varchar(80) default NULL,
  creationdate datetime default NULL,
  enddate datetime default NULL,
  status varchar(20) default NULL,
  logo varchar(80) default NULL,
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--Activities table
CREATE TABLE activities (
  id int(20) NOT NULL auto_increment,
  name varchar(80) NOT NULL,
  description varchar(80) default NULL,
  actbudget int(10) default NULL,
  estbudget int(10) default NULL,
  startdate datetime default NULL,
  enddate datetime default NULL,
  status varchar(20) default NULL,
  logo varchar(80) default NULL,
  imagesloc varchar(80) default NULL,  
  projectid int(20) default NULL,
  PRIMARY KEY  (id),
  FOREIGN KEY (projectid) REFERENCES projects(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--Feedback table
CREATE TABLE feedback (
  id int(20) NOT NULL auto_increment,
  activityid int(20) default NULL,
  feedbacktype varchar(20) default NULL,
  feedback varchar(1000) default NULL,
  PRIMARY KEY  (id),
  FOREIGN KEY (activityid) REFERENCES activities(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--Boardmembers table
CREATE TABLE boardmembers (
  id int(20) NOT NULL auto_increment,
  name varchar(80) default NULL,
  role varchar(20) default NULL,
  roledesc varchar(80) default NULL,
  phone varchar(15) default NULL,
  address varchar(255) default NULL,
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;