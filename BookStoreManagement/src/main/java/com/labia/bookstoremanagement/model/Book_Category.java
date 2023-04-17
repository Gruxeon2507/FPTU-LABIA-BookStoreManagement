/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.labia.bookstoremanagement.modelkey.BookCategoryKey;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author ADMIN
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "Book_Category")
public class Book_Category {

    @EmbeddedId
    private BookCategoryKey bookCategoryKey;

    @ManyToOne
    @MapsId("bookId")
    @JoinColumn(name = "bookId")
    @JsonIgnore
    Book book;

    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "categoryId")
    @JsonIgnore
    Category category;

}
