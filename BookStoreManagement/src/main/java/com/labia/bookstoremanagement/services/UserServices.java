/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.services;

/**
 *
 * @author kmd
 */
import com.labia.bookstoremanagement.model.User;
import com.labia.bookstoremanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServices implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        try {
            return user;
        } catch (Exception e) {
            System.out.println("User not found with username: " + username);
        }
        return null;
    }

    public List<User> searchUsers(String query) {
        return userRepository.customSearchUsers(query);
    }

    public void updateUser(String query){
        userRepository.customUpdateUser(query);
    }

}
