/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.labia.bookstoremanagement.repository;

import com.labia.bookstoremanagement.model.User;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author emiukhoahoc
 */
public interface UserRepository extends JpaRepository<User, String> {

    User findByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO User_Role(username, roleId) VALUES ( :username, :roleId);", nativeQuery = true)
    void saveUser_Role(@Param("username") String username, @Param("roleId") Integer roleId);

}
