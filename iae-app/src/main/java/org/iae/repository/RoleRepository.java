package org.iae.repository;

import org.iae.pojo.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

    Page<Role> findAll(Pageable pageable);

    Role findByNameIgnoringCase(String name);

}