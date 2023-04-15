/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.model;

import com.labia.bookstoremanagement.modelkey.UserRoleKey;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.*;

/**
 *
 * @author ADMIN
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "User_Role")
public class User_Role {

    @EmbeddedId
    private UserRoleKey userRoleKey;

    @ManyToOne
    @JoinColumn(name = "username")
    User user;

    @ManyToOne
    @JoinColumn(name = "roleId")
    Role role;
}
