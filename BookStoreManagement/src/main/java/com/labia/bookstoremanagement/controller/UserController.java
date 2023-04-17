/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.controller;

import com.labia.bookstoremanagement.model.User;
import com.labia.bookstoremanagement.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author emiukhoahoc
 */
@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    UserRepository userRepository;
    
    @GetMapping
    List<User> getAllUser(){
        return userRepository.findAll();
    }
    
    @GetMapping("/{username}")
    User getUser(@PathVariable String username){
        return userRepository.findByUsername(username);
    }
            
    
}
