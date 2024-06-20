package JMMP.TransRoute.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import JMMP.TransRoute.Model.Ruta;

@Repository
public interface RutaRepository  extends MongoRepository<Ruta, String>{

	List<Ruta> findRutaByNombre(String nombre);

}
