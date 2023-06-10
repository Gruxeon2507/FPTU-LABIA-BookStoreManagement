package com.labia.bookstoremanagement.controller;


import com.labia.bookstoremanagement.model.User;
import com.labia.bookstoremanagement.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("api/test")
public class TestController {
    @Autowired
    UserServices userServices;

    @GetMapping("/user")
    public ResponseEntity<?> testLogin(@RequestBody User user){
        String query = "SELECT * FROM User WHERE username='"+user.getUsername()+"' AND password='"+user.getPassword()+"';";
        System.out.println(query);


        try{
            List<User> u = userServices.searchUsers(query);
            if(u.size()>=0&&u!=null){
                return ResponseEntity.status(HttpStatus.OK).build();
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();


        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }
}
