package com.labia.bookstoremanagement.controller;

import com.labia.bookstoremanagement.configuration.JwtTokenFilter;
import com.labia.bookstoremanagement.model.User;
import com.labia.bookstoremanagement.repository.UserRepository;
import com.labia.bookstoremanagement.repository.UserRepositoryImpl;
import com.labia.bookstoremanagement.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("")
public class UserSQLi {
    private final UserRepositoryImpl userRepositoryImpl;

    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtTokenUtil jwtTokenUtil;


    @Autowired
    public UserSQLi(UserRepositoryImpl userRepositoryImpl) {
        this.userRepositoryImpl = userRepositoryImpl;
    }

    @PostMapping("/update-profile")
    public void updateProfile(@RequestBody User user, HttpServletRequest request) {
        User u = userRepository.findByUsername(jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request)));
        u.setDisplayName(user.getDisplayName());
        u.setDob(user.getDob());
        u.setEmail(user.getEmail());
        userRepositoryImpl.updateUserInformation(u);
    }
}
