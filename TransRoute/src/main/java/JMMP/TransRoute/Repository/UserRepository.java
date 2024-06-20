package JMMP.TransRoute.Repository;

import JMMP.TransRoute.Model.User;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByName(String name);
    List<User> findByEmail(String email);
}
