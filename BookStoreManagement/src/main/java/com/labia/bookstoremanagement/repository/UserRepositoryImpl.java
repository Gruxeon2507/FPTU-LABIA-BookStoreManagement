package com.labia.bookstoremanagement.repository;

import com.labia.bookstoremanagement.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDate;
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

    @Override
    @Transactional
    @Modifying
    public void customUpdateUser(String query) {
        Query nativeQuery = entityManager.createNativeQuery(query, User.class);
        nativeQuery.executeUpdate();
    }

    //    @Override
    @Transactional
    @Modifying
    public void updateUserInformation(User user) {
            String displayName = "'" + user.getDisplayName() + "'";
            String query = "UPDATE `User` SET  email = ?, dob = ?, displayName = '"+user.getDisplayName()+"' WHERE username = "+"'"+user.getUsername()+"';";
            System.out.println(user.getUsername());
            System.out.println(user.getDisplayName());
            System.out.println(query);

            Date sqlDate = Date.valueOf(user.getDob().toLocalDate());
            Query nativeQuery = entityManager.createNativeQuery(query,User.class);
            nativeQuery.setParameter(2, sqlDate);
            nativeQuery.setParameter(1,user.getEmail());

            nativeQuery.executeUpdate();
    }
}
