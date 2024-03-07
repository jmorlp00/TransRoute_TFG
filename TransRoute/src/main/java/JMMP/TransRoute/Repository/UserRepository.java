package JMMP.TransRoute.Repository;

import JMMP.TransRoute.Model.User;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByName(String name);
    List<User> findByRole(String role);
}
