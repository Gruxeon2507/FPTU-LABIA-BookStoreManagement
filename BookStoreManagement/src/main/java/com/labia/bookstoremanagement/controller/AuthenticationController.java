/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.controller;

import com.labia.bookstoremanagement.model.Session;
import com.labia.bookstoremanagement.model.User;
import com.labia.bookstoremanagement.utils.AuthorizationUtils;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kmd
 */
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    
    @Autowired
    private com.labia.bookstoremanagement.repository.UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User credentials, HttpServletRequest request) {
        User user = userRepository.findByUsername(credentials.getUsername());
        if (user != null && (user.getPassword().equals(credentials.getPassword())||AuthorizationUtils.checkPassword(credentials.getPassword(), user.getPassword()))) {
            HttpSession session = request.getSession();
            user.setPassword("");
            String sessionId = UUID.randomUUID().toString();
           
            session.setAttribute("sessionId", session.getId());
            session.setAttribute("user", user);

            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @GetMapping("/checkSession")
    public ResponseEntity<String> checkSession(HttpServletRequest request,@RequestBody String sessionId) {
        HttpSession session = request.getSession(false);
        System.out.println(session.getId());
        System.out.println(sessionId);
        if (sessionId.contains(session.getId())) {
            // Session found for the given sessionId
            String username = ((User)session.getAttribute("user")).getUsername();
            return ResponseEntity.ok(username);
        } else {
            // Session not found for the given sessionId
            return ResponseEntity.ok(session.getId());
        }
        
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().build();
    }
    
}