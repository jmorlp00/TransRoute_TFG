package JMMP.TransRoute.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import JMMP.TransRoute.Model.Sucursal;
import JMMP.TransRoute.Repository.SucursalRepository;



public class SucursalService {
	@Autowired
	SucursalRepository sucursalRepository;
	public Sucursal getSucursalById(String id) {
		
		Optional<Sucursal> optionalSucursal = sucursalRepository.findById(id);
		
		if(optionalSucursal == null || optionalSucursal.get() == null) {
			return null;
		}
		
		Sucursal gerente = optionalSucursal.get();
		return gerente;
	}
}
