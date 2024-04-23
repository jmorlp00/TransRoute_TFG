package JMMP.TransRoute.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import JMMP.TransRoute.Model.Transportista;

public interface TransportistaRepository extends MongoRepository<Transportista, String>{
		List<Transportista> findByGerente(String gerenteId);
		List<Transportista> findByEmail(String email);
}
