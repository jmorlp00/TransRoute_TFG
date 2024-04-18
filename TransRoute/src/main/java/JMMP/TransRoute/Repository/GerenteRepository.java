package JMMP.TransRoute.Repository;

import JMMP.TransRoute.Model.Gerente;

public interface GerenteRepository {
	
	Gerente findByGerenteId(String gerenteId);

	Gerente findByUserId(String userId);

	
}
