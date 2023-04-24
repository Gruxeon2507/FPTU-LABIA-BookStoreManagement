/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.controller;

import com.labia.bookstoremanagement.model.Role;
import com.labia.bookstoremanagement.model.User;
import com.labia.bookstoremanagement.repository.UserRepository;
import com.labia.bookstoremanagement.utils.DateTimeUtils;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author emiukhoahoc
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    private final String AVT_UPLOAD_DIR = "/avatar/";

    @GetMapping
    List<User> getAllUser() {
        return userRepository.findAll();
    }

    @GetMapping("/{username}")
    User getUser(@PathVariable String username) {
        return userRepository.findByUsername(username);
    }

    @GetMapping(value = "/avatar/{fileId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<InputStreamResource> getUserAvatar(@PathVariable String fileId) throws IOException {
        String filePath = "avatar/" + fileId + ".jpg";
        File file = new File(filePath);
        InputStream inputStream = new FileInputStream(file);
        InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + fileId);
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.IMAGE_JPEG)
                .body(inputStreamResource);
    }

    @PostMapping(value = "/update")
    public void updateUserInformation(@RequestBody User user) {
        User temp = userRepository.findByUsername(user.getUsername());
        temp.setDisplayName(user.getDisplayName());
        temp.setDob(user.getDob());
        temp.setEmail(user.getEmail());
        userRepository.save(temp);
    }

    @PostMapping("/avatar/upload")
    public void ploadFile(@RequestParam("avatarPath") MultipartFile file, @RequestParam("username") String username) {
        String fileExtension = getFileExtension(file.getOriginalFilename());
        if ((!fileExtension.equalsIgnoreCase("jpg")) && file.getSize() < 5000000) {
            String fileName = StringUtils.cleanPath(username + ".jpg");
            try {
                // Save the file to the uploads directory

                String uploadDir = System.getProperty("user.dir") + AVT_UPLOAD_DIR;
                file.transferTo(new File(uploadDir + fileName));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    private static String getFileExtension(String fileName) {
        String extension = "";
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
            extension = fileName.substring(dotIndex + 1);
        }
        return extension;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        user.setAvatarPath("avatar/"+user.getUsername()+".jpg");
        user.setCreateDate(DateTimeUtils.getSqlDateNow());
        user.setLastActive(DateTimeUtils.getSqlTimeStampNow());
        userRepository.save(user);
        userRepository.saveUser_Role(user.getUsername(), 3);
         return userRepository.save(user);
    }
    
    @PostMapping("/register/avatar/upload")
    public void registerFile(@RequestParam("avatarPath") MultipartFile file, @RequestParam("username") String username) {
        String fileExtension = getFileExtension(file.getOriginalFilename());
        if ((fileExtension.equalsIgnoreCase("jpg")) && file.getSize() < 5000000) {
            String fileName = StringUtils.cleanPath(username + ".jpg");
            try {
                // Save the file to the uploads directory

                String uploadDir = System.getProperty("user.dir") + AVT_UPLOAD_DIR;
                file.transferTo(new File(uploadDir + fileName));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
