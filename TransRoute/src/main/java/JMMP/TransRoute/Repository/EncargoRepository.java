package JMMP.TransRoute.Repository;

import java.util.List;

import JMMP.TransRoute.Model.Encargo;

public interface EncargoRepository {
	Encargo findById(String Id);
	
	List<Encargo> findByTransportista(String transportistaId);
	
	List<Encargo> findByRuta(String rutaId);
}
