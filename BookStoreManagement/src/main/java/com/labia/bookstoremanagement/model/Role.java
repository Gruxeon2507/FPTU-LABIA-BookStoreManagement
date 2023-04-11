/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.model;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
@Table(name = "Role")
public class Role {

    @Id
    private int roleId;
    private String roleName;
    @ManyToMany(mappedBy = "roles")
    @JoinTable(name = "User_Role",
            joinColumns = @JoinColumn(name = "roleId"), 
            inverseJoinColumns = @JoinColumn(name = "userName"))
    private List<User> users;

    @ManyToMany(mappedBy = "roles")
    @JoinTable(name = "Role_Feature",
            joinColumns = @JoinColumn(name = "roleId"), 
            inverseJoinColumns = @JoinColumn(name = "featureId"))
    private List<Feature> features;
    

}
