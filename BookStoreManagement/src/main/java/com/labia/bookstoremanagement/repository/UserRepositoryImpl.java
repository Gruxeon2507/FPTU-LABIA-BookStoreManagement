package com.labia.bookstoremanagement.repository;

import com.labia.bookstoremanagement.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> customSearchUsers(String query) {
        Query nativeQuery = entityManager.createNativeQuery(query, User.class);
        return nativeQuery.getResultList();
    }
}
