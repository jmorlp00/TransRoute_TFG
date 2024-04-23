package JMMP.TransRoute.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

import JMMP.TransRoute.Model.Gerente;

public interface GerenteRepository extends MongoRepository<Gerente, String>{
	List<Gerente> findByEmail(String email);


	
}
