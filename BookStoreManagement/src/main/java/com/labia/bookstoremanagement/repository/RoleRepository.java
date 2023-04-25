/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.labia.bookstoremanagement.repository;

import com.labia.bookstoremanagement.model.Role;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author emiukhoahoc
 */
public interface RoleRepository extends JpaRepository<Role, Integer>{

    @Query(value = "select r from Role r join r.users u where u.username = :username")
    public List<Role> findByUsername(String username);
    
}