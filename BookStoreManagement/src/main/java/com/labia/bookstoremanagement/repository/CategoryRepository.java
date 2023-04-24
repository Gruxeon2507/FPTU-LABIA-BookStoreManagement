/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.repository;

import com.labia.bookstoremanagement.model.Category;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author emiukhoahoc
 */
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query("select c from Category c join c.books b where b.bookId = :bookId")
    List<Category> getCategoryByBookId(Integer bookId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Book_Category(bookId, categoryId) VALUES ( :bookId, :categoryId);", nativeQuery = true)
    void saveBook_Category(@Param("bookId") Integer bookId, @Param("categoryId") Integer categoryId);

}
