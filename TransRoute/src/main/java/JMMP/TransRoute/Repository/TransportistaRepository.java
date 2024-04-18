package JMMP.TransRoute.Repository;

import java.util.List;

import JMMP.TransRoute.Model.Transportista;

public interface TransportistaRepository {
		Transportista findByTransportistaId(String transportistaId);
		
		Transportista findByUserId(String userId);
		
		List<Transportista> findByGerente(String gerenteId);
		
}
