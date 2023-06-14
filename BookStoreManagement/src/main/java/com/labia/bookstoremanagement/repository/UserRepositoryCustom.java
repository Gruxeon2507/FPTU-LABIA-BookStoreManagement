package com.labia.bookstoremanagement.repository;

import com.labia.bookstoremanagement.model.User;

import java.util.List;

public interface UserRepositoryCustom {
    List<User> customSearchUsers (String query);

}
