package JMMP.TransRoute.Repository;

import java.util.List;

import JMMP.TransRoute.Model.Ruta;

public interface RutaRepository {
	Ruta findRutaById(String Id);
	
	List<Ruta> findRutaByNombre(String nombre);
	List<Ruta> findRutaByRestrictions(double altura, double mma, double longitud);
}
