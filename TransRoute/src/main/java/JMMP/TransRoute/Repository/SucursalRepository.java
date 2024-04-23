package JMMP.TransRoute.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import JMMP.TransRoute.Model.Sucursal;


public interface SucursalRepository extends MongoRepository<Sucursal, String>{
	
	
}
