CREATE TABLE roles (id INT(50) NOT NULL AUTO_INCREMENT, name VARCHAR(80) DEFAULT NULL, description VARCHAR(80) DEFAULT NULL, 
  PRIMARY KEY  (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE users (id int(20) NOT NULL, name varchar(20) NOT NULL, mobile varchar(15) NOT NULL, 
  password varchar(80) NOT NULL, email varchar(50) default NULL, role int(20) NOT NULL,
  PRIMARY KEY  (id),
  UNIQUE KEY uc_username (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Constraints
ALTER TABLE roles ADD CONSTRAINT uc_rolename UNIQUE (name);

-- Indexes
CREATE INDEX idx_rolename ON roles ( NAME );
