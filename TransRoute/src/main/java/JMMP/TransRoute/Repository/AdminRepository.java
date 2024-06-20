package JMMP.TransRoute.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import JMMP.TransRoute.Model.Admin;
@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
	List<Admin> findByEmail(String email);

}
