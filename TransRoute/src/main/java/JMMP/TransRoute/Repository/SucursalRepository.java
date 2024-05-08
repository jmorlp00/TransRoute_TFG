package JMMP.TransRoute.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import JMMP.TransRoute.Model.Sucursal;


public interface SucursalRepository extends MongoRepository<Sucursal, String>{
	List<Sucursal> findByDireccion(String direccion);

	
}
