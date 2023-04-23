/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.controller;

import com.labia.bookstoremanagement.model.Book;
import com.labia.bookstoremanagement.model.Category;
import com.labia.bookstoremanagement.model.Role;
import com.labia.bookstoremanagement.model.User;
import com.labia.bookstoremanagement.repository.BookRepository;
import com.labia.bookstoremanagement.repository.CategoryRepository;
import com.labia.bookstoremanagement.repository.UserRepository;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    @Autowired
    BookRepository bookRepository;
    @Autowired
    CategoryRepository categoryRepository;

    private final String AVT_UPLOAD_DIR = "/avatar/";

    @GetMapping
    List<User> getAllUser() {
        return userRepository.findAll();
    }

    @GetMapping("superadmin")
    List<User> getUserForSuperAdmin() {
        return userRepository.getUserExceptSuperAdmin();
    }

    @GetMapping("admin")
    List<User> getUserForAdmin() {
        return userRepository.getUserExceptAdmin();
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

    @DeleteMapping("/{username}")
    ResponseEntity<ResponseObject> deleteUser(@PathVariable String username) {
        boolean exists = userRepository.existsByUsername(username);
        User user = userRepository.findByUsername(username);
        if (exists) {
            // Remove user from all roles
            for (Role role : user.getRoles()) {
                role.getUsers().remove(user);
            }
            user.getRoles().clear();

            for (Book book : user.getBooks()) {
                // Remove categories from all books
                //                book.setCreatedBy(null);
                for (Category category : book.getCategories()) {
                    category.getBooks().remove(book);
                }
                book.getCategories().clear();
                //remove 
//                user.getBooks().remove(book);
                //                bookRepository.save(book);
                bookRepository.delete(book);
            }

            user.getBooks().clear(); // clear all the books associated with this user
//            userRepository.save(user); // save the changes to the database

            // Delete the user
            userRepository.delete(user);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "delete user successfully")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot find user to delete")
        );
    }

}
