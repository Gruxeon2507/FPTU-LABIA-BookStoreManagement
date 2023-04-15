/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.model;

import com.labia.bookstoremanagement.modelkey.RoleFeatureKey;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author ADMIN
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Role_Feature")
public class Role_Feature {

    @EmbeddedId
    private RoleFeatureKey roleFeatureKey;

    @ManyToOne
    @JoinColumn(name = "roleId")
    Role role;

    @ManyToOne
    @JoinColumn(name = "featureId")
    Feature feature;
}
