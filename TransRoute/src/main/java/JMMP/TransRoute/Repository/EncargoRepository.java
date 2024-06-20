package JMMP.TransRoute.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import JMMP.TransRoute.Model.Encargo;

@Repository
public interface EncargoRepository extends MongoRepository<Encargo, String>{

	
	List<Encargo> findByTransportista(String transportistaId);
	
	List<Encargo> findByRuta(String rutaId);
}
