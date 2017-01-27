--Roles table
CREATE TABLE roles (
  id bigint(50) NOT NULL AUTO_INCREMENT,
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
  UNIQUE KEY uc_username (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--Security Questions table
CREATE TABLE securityquestions (
  id int(80) NOT NULL,
  name varchar(80) default NULL,
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;