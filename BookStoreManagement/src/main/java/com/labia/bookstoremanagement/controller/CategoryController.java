/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.controller;

import com.labia.bookstoremanagement.model.Category;
import com.labia.bookstoremanagement.repository.CategoryRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author emiukhoahoc

 */
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("api/categories")
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;
    
    @GetMapping
    List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    @GetMapping("by-book/{bookId}")
    List<Category> getCategoryByBook(@PathVariable Integer bookId) {
        return categoryRepository.getCategoryByBookId(bookId);
    }
    
    
    
    

}
