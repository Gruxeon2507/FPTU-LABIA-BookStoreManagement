/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.labia.bookstoremanagement.repository;

import com.labia.bookstoremanagement.model.User;
import java.util.List;
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

    @Query(value = "select * from `User` u where u.username not in (select us.username from `User` us join User_Role ur on us.username = ur.username where ur.roleId = 1)", nativeQuery = true)
    List<User> getUserExceptSuperAdmin();

    @Query(value = "select * from `User` u where u.username not in (select us.username from `User` us join User_Role ur on us.username = ur.username where ur.roleId = 2 and us.username = 'maiphuonghoang' or ur.roleId = 1)", nativeQuery = true)
    List<User> getUserExceptAdmin();

    @Transactional
    public void deleteByUsername(String username);

    public boolean existsByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM User_Role ur WHERE ur.username = :username AND ur.roleId = :roleId", nativeQuery = true)
    void deleteRoleFromUser(@Param("username") String username, @Param("roleId") Integer roleId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO User_Role (username, roleId) VALUES (:username, :roleId)", nativeQuery = true)
    void addUserRole(@Param("username") String username, @Param("roleId") Integer roleId);

}
