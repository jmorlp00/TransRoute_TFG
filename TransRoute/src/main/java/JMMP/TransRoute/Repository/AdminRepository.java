package JMMP.TransRoute.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import JMMP.TransRoute.Model.Admin;

public interface AdminRepository extends MongoRepository<Admin, String> {
	List<Admin> findByEmail(String email);

}
