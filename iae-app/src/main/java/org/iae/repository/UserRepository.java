package org.iae.repository;

import java.util.List;

import org.iae.pojo.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Page<User> findAll(Pageable pageable);

    User findByMobileOrEmail(String mobile, String email);

    List<User> findByRole(Integer role);
}
