package JMMP.TransRoute.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;


import JMMP.TransRoute.Model.Encargo;

public interface EncargoRepository extends MongoRepository<Encargo, String>{

	
	List<Encargo> findByTransportista(String transportistaId);
	
	List<Encargo> findByRuta(String rutaId);
}
