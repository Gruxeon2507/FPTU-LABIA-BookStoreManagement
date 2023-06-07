/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.controller;


import com.labia.bookstoremanagement.configuration.JwtTokenFilter;
import com.labia.bookstoremanagement.model.ResponseObject;
import com.labia.bookstoremanagement.model.Book;
import com.labia.bookstoremanagement.model.Category;

import com.labia.bookstoremanagement.model.Role;
import com.labia.bookstoremanagement.model.User;
import com.labia.bookstoremanagement.model.UserExcelExporter;
import com.labia.bookstoremanagement.repository.BookRepository;
import com.labia.bookstoremanagement.repository.CategoryRepository;
import com.labia.bookstoremanagement.repository.UserRepository;
import com.labia.bookstoremanagement.services.UserServices;
import com.labia.bookstoremanagement.utils.AuthorizationUtils;
import com.labia.bookstoremanagement.utils.DateTimeUtils;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;


import java.nio.file.Path;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;


import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.labia.bookstoremanagement.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    private final String AVT_UPLOAD_DIR = "/avatar/";

    @GetMapping
    List<User> getAllUser() {
        return userRepository.findAll();
    }

    @GetMapping("superadmin")
    List<User> getUserForSuperAdmin() {
        return userRepository.getUserExceptSuperAdmin();
    }

    @GetMapping("/{username}")
    User getUser(@PathVariable String username) {
        return userRepository.findByUsername(username);
    }
    
      @GetMapping("/check/{username}")
    public ResponseEntity<String> checkUsernameExists(@PathVariable("username") String username) {
        User usernameExists = userRepository.findByUsername(username);
        if (usernameExists != null) {
            return ResponseEntity.ok("Username already taken");
        } else {
            return ResponseEntity.ok("Username available");
        }
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
        user.setPassword(AuthorizationUtils.hashPassword(user.getPassword()));
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

            // clear all the books associated with this user
//            user.getBooks().clear();
            for (Book book : user.getBooks()) {
                // Remove categories from all books
                for (Category category : book.getCategories()) {
                    category.getBooks().remove(book);
                }
                book.getCategories().clear();

                bookRepository.delete(book);
            }

            // Delete the user
            userRepository.delete(user);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "delete user successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot find user to delete", "")
        );
    }

    @DeleteMapping("/demote/{username}")
    ResponseEntity<ResponseObject> demoteUser(@PathVariable String username) {
        boolean exists = userRepository.existsByUsername(username);
        User user = userRepository.findByUsername(username);
        if (exists) {
            userRepository.deleteRoleFromUser(username, 2);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "delete role of user successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot find user to delete role", "")
        );
    }

    @PostMapping("/promote/{username}")
    ResponseEntity<ResponseObject> promoteAdmin(@PathVariable String username) {
        boolean exists = userRepository.existsByUsername(username);
        User user = userRepository.findByUsername(username);
        if (exists) {
            userRepository.addUserRole(username, 2);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "add role of user successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot find user to add role", "")
        );
    }


    @GetMapping("by-book/{bookId}")
    User getUserByBookId(@PathVariable("bookId") int bookId) {
        Book book = bookRepository.findByBookId(bookId);
        return userRepository.getUserByBooks(book);
    }

    @GetMapping("/onlyuser")
    public List<User> getSomeUsersByCondition(
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createDate").descending());
        //        return userRepository.findAll(pageable).getContent();       
        return userRepository.getOnlyRoleUser(pageable);
    }

    @GetMapping("/onlyuser/count")
    public int countUser() {
        return userRepository.countOnlyRoleUser();
    }

//    @GetMapping("/onlyadmin")
//    List<User> getRoleAdmin() {
//        String username = "khoahoc";
//        return userRepository.getOnlyRoleAdmin(username);
//    }
    @GetMapping("/onlyadmin")
    public List<User> getSomeAdminsByCondition(
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize
    ) {
        String username = "khoahoc";
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createDate").descending());
        return userRepository.getOnlyRoleAdmin(username, pageable);
    }

    @GetMapping("/onlyadmin/count")
    public int countAdmin() {
        String username = "khoahoc";
        return userRepository.countOnlyRoleAdmin(username);
    }
    
    @GetMapping("/search/{searchText}")
    ResponseEntity<Page<User>> findAll(Pageable pageable,@PathVariable String searchText){
        return new ResponseEntity<>(userRepository.findAll(pageable, searchText), HttpStatus.OK);
    }
    
    @GetMapping("/export")
    public void exportUserToExcel(HttpServletResponse response) throws IOException{
        response.setContentType("application/octet-stream");
        String headerKey = "Content-Disposition";
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());
        String fileName = "users_" + currentDateTime + ".xlsx";        
        String headerValue = "attachement; filename=" +fileName;
        response.setHeader(headerKey, headerValue);
        List<User> listUsers = userRepository.findAll();
        UserExcelExporter excelExporter = new UserExcelExporter(listUsers);
        excelExporter.export(response);     
    }

    @GetMapping("/loginuser")
    public ResponseEntity<?> getLoginUsername(HttpServletRequest request){
        try{
            String token = jwtTokenFilter.getJwtFromRequest(request);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            User user = userRepository.findByUsername(username);
            if(user!=null){
                return  ResponseEntity.ok(user.getUsername());
            }else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

            }
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        }
    }

    @GetMapping("/info")
    public ResponseEntity<?> getLoginUserInfo(HttpServletRequest request){
        try{
            String token = jwtTokenFilter.getJwtFromRequest(request);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            User user = userRepository.findByUsername(username);
            if(user!=null){
                return  ResponseEntity.ok(user);
            }else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

            }
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        }
    }

}
