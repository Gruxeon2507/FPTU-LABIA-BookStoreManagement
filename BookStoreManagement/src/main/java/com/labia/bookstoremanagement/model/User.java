/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author huyen
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "`User`")
public class User implements Serializable {

    @Id
    private String username;
    private String password;
    private String displayName;
    private String email;
    private Date dob;
    private Date createDate;
    private String avatarPath;
    private java.sql.Timestamp lastActive;

    @OneToMany(mappedBy = "user")
    private List<Book> books;

    
    @OneToMany(mappedBy = "user")
    private List<User_Role> user_roles;
}
