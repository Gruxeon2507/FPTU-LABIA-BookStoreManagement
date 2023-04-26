/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.labia.bookstoremanagement.repository;

import com.labia.bookstoremanagement.model.User;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query(value = "select * from `User` u join User_Role ru  on u.username = ru.username  where ru.roleId = 2 and u.username not in (select us.username from `User` us \n"
            + "join User_Role ur on us.username = ur.username \n"
            + "where ur.roleId = 2 and us.username = :username or ur.roleId = 1) ORDER BY u.createDate DESC", nativeQuery = true)
    List<User> getOnlyRoleAdmin(String username, Pageable pageable);

    @Query(value = "select * from `User` us WHERE us.username in (\n"
            + "select u.username from `User` u join User_Role ur  on u.username = ur.username GROUP BY u.username\n"
            + "HAVING  COUNT(roleId) = 1)", nativeQuery = true)
    List<User> getOnlyRoleUser(Pageable pageable);

    @Query(value = "select count(*) from `User` us WHERE us.username in (\n"
            + "select u.username from `User` u join User_Role ur  on u.username = ur.username GROUP BY u.username\n"
            + "HAVING  COUNT(roleId) = 1)", nativeQuery = true)
    int countOnlyRoleUser();

    @Query(value = "select count(*) from `User` u join User_Role ru  on u.username = ru.username  where ru.roleId = 2 and u.username not in (select us.username from `User` us \n"
            + "join User_Role ur on us.username = ur.username \n"
            + "where ur.roleId = 2 and us.username = :username or ur.roleId = 1) ", nativeQuery = true)
    int countOnlyRoleAdmin(String username);

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

    @Query("FROM User u WHERE u.displayName LIKE %:searchText% OR u.email LIKE %:searchText%")
    Page<User> findAll(Pageable pageable, @Param("searchText") String searchText);

}
