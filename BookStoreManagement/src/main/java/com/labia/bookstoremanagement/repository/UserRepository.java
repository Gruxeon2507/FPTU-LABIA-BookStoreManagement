/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.repository;

import com.labia.bookstoremanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author huyen
 */
public interface UserRepository extends JpaRepository<User, String>{
    User findByUsername(String username);
}
