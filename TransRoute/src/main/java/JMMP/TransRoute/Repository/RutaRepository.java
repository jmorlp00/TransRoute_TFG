package JMMP.TransRoute.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import JMMP.TransRoute.Model.Ruta;


public interface RutaRepository  extends MongoRepository<Ruta, String>{
	Ruta findRutaById(String Id);
	List<Ruta> findRutaByNombre(String nombre);

}
