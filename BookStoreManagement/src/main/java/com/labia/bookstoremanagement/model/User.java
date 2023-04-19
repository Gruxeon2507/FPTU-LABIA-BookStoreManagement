/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.model;

import java.sql.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.naming.java.javaURLContextFactory;

/**
 *
 * @author huyen
 */
//@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "`User`")
public class User {

    @Id
    private String username;
    private String password;
    private String displayName;
    private String email;
    private Date dob;
    private Date createDate;
    private String avatarPath;
    private java.sql.Timestamp lastActive;

    @OneToMany(mappedBy = "createdBy")
    private List<Book> books;
    
    @ManyToMany(mappedBy = "users")
    private List<Role> roles;

}
