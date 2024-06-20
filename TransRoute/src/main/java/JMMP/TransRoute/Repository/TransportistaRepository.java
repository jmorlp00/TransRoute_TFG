package JMMP.TransRoute.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import JMMP.TransRoute.Model.Transportista;

@Repository
public interface TransportistaRepository extends MongoRepository<Transportista, String>{
		List<Transportista> findByGerenteId(String gerenteId);
		List<Transportista> findBySucursalId_Id(String sucursalId);
		List<Transportista> findByEmail(String email); 
}
