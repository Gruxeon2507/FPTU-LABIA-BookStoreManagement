/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.controller;

import com.labia.bookstoremanagement.model.Book;
import com.labia.bookstoremanagement.model.User;
import com.labia.bookstoremanagement.repository.BookRepository;
import com.labia.bookstoremanagement.repository.UserRepository;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author emiukhoahoc
 */
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("api/books")
public class BookController {

    @Autowired
    BookRepository bookRepository;
    @Autowired
    UserRepository userRepository;

    @GetMapping
    List<Book> getAll() {
        return bookRepository.findAll();
    }

   @GetMapping("by-id/{bookId}")
    Book getBookById(@PathVariable("bookId") Integer id){
        return bookRepository.findByBookId(id);
    }
    

    @GetMapping("/public")
    List<Book> getAllPublic() {
        return bookRepository.findByIsApproved(true);
    }

    @GetMapping("/unpublic")
    List<Book> getAllUnPublic() {
        return bookRepository.findByIsApproved(false);
    }

    @GetMapping("/someunpublic")
    List<Book> getSomeUnpublic() {
        Pageable pageable = PageRequest.of(0, 12, Sort.by("bookId").descending());
        return bookRepository.findByIsApprovedFalseOrderByBookIdDesc(pageable);
    }


    @GetMapping("by-user/{username}")
    List<Book> getBookByUser(@PathVariable String username) {
        return bookRepository.getBookByUsername(username);
    }

    @GetMapping("find-by-user/{bookId}")
    User getUserOfBook(@PathVariable Integer bookId) {
        return bookRepository.getBookCreated(bookId);
    }

    @GetMapping("by-category/{categoryId}")
    List<Book> getBookByCategory(@PathVariable Integer categoryId) {
        return bookRepository.getBookByCategoryId(categoryId);
    }

    @GetMapping(value = "/pdf/{fileId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> getFile(@PathVariable String fileId) throws IOException {
        String filePath = "pdf/" + fileId + ".pdf";
        File file = new File(filePath);
        InputStream inputStream = new FileInputStream(file);
        InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + fileId);
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(inputStreamResource);
    }

    @GetMapping(value = "/cover/{fileId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<InputStreamResource> getImage(@PathVariable String fileId) throws IOException {
        String filePath = "cover/" + fileId + ".jpg";
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

    @GetMapping("page")
    public List<Book> getBooks(
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Book> pageBooks = bookRepository.findAll(pageable);
        List<Book> books = pageBooks.getContent();
        return books;
    }

    @GetMapping("publicpage")
    public List<Book> getPublicBooks(
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Book> pageBooks = bookRepository.findByIsApproved(true, pageable);
        List<Book> books = pageBooks.getContent();
        return books;
    }

    @GetMapping("/by-categories/publicpage/{categoryIds}")
    public List<Book> getPageBooksByCategories(
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize,
            @PathVariable("categoryIds") Integer[] categoryIds
    ) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        List<Book> books = bookRepository.getBookByCategoryIds(categoryIds);
        List<Integer> bookIds = new ArrayList<>();
        for (Book book : books) {
            bookIds.add(book.getBookId());
        }
        Page<Book> pageBooks = bookRepository.findByBookIdIn(bookIds, pageable);
//        Page<Book> pageBooks = bookRepository.getBookByBookId(1, pageable);
        List<Book> bookss = pageBooks.getContent();
        return bookss;
    }

    @GetMapping("by-categories/{categoryIds}")
    public List<Book> getBooks(@PathVariable("categoryIds") Integer[] categoryIds) {
        List<Book> books = bookRepository.getBookByCategoryIds(categoryIds);
        return books;
    }

    @GetMapping("/search/{searchText}")
    ResponseEntity<Page<Book>> findAllPublic(
            @PathVariable String searchText,
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return new ResponseEntity<>(bookRepository.findAllPublic(pageable, searchText), HttpStatus.OK);
    }
}
