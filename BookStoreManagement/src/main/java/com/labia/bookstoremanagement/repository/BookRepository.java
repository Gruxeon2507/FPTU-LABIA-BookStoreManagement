/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.labia.bookstoremanagement.repository;

import com.labia.bookstoremanagement.model.Book;
import com.labia.bookstoremanagement.model.User;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author emiukhoahoc
 */
public interface BookRepository extends JpaRepository<Book, Integer> {

//    @Query(value = "select * from book b join user u on  b.createdBy = u.username where u.username =?1 ", nativeQuery = true)
    @Query(value = "select b from Book b join b.createdBy u where u.username =:username")
    List<Book> getBookByUsername(String username);

    @Query("select b from Book b join b.categories c where c.categoryId = :categoryId")
    List<Book> getBookByCategoryId(Integer categoryId);
    
    @Query("select distinct b from Book b join b.categories c where c.categoryId in :categoryIds")
    List<Book> getBookByCategoryIds(Integer[] categoryIds);

    public Page<Book> findByBookIdIn(List<Integer> bookIds, Pageable pageable);

    public List<Book> findByCreatedBy(User user);

    public Book findByBookId(Integer id);
}
