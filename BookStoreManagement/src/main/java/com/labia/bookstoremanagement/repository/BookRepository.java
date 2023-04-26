/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.labia.bookstoremanagement.repository;

import com.labia.bookstoremanagement.model.Book;
import com.labia.bookstoremanagement.model.User;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query(value = "SELECT * FROM Book order by bookId desc LIMIT 1", nativeQuery = true)
    Book findLastBook();

    @Query(value = "SELECT AUTO_INCREMENT\n"
            + "FROM information_schema.TABLES\n"
            + "WHERE TABLE_SCHEMA = 'fu_labia_bookstoremanagement'\n"
            + "AND TABLE_NAME = 'Book'", nativeQuery = true)
    int findLastindex();

    public Page<Book> findByBookIdIn(List<Integer> bookIds, Pageable pageable);

    public Book findByTitle(String title);

//    @Query("select distinct b from Book b join b.categories c where c.categoryId in :categoryIds and b.isApproved = '1'")
//    List<Book> getBookByCategoryIds(Integer[] categoryIds);

    @Query("select b.createdBy from Book b where b.bookId = :bookId ")
    User getBookCreated(Integer bookId);
//
//    public Page<Book> findByBookIdIn(List<Integer> bookIds, Pageable pageable);

    public List<Book> findByCreatedBy(User user);


    public Book findByBookId(Integer id);

    public Page<Book> findByIsApproved(boolean isApproved, Pageable pageable);

    public List<Book> findByIsApproved(boolean isApproved);

    @Modifying
    @Transactional
    @Query(value = "update Book b set b.isApproved=1 where b.bookId=?1", nativeQuery = true)
    public void updateBookStatus(@Param("bookId") Integer bookId);

    public void deleteByBookId(int bookId);

    @Modifying
    @Transactional
    @Query(value = "delete from Book_Category where bookId = ?1", nativeQuery = true)
    public void deleteBookCategoryByBookId(@Param("bookId") int bookId);


    public Book findByBookId(Integer id);

    public Page<Book> findByIsApproved(boolean b, Pageable pageable);

    public List<Book> findByIsApproved(boolean b);

    List<Book> findByIsApprovedFalseOrderByBookIdDesc(Pageable pageable);

    @Query(value = "select * from Book b where (b.isApproved = '1') "
            + "and (b.title LIKE %?1% OR b.price LIKE %?1% OR b.authorName LIKE %?1%)" , nativeQuery = true)
    Page<Book> findAllPublic(Pageable pageable, String searchText);



}
