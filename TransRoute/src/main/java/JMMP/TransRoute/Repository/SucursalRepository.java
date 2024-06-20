package JMMP.TransRoute.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import JMMP.TransRoute.Model.Sucursal;

@Repository
public interface SucursalRepository extends MongoRepository<Sucursal, String>{
	List<Sucursal> findByDireccion(String direccion);

	
}
