package JMMP.TransRoute.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import JMMP.TransRoute.Model.Sucursal;
import JMMP.TransRoute.Model.Transportista;
import JMMP.TransRoute.Repository.SucursalRepository;
import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
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
	
	public List<Sucursal> getAll(){
		List<Sucursal> sucursalList = sucursalRepository.findAll();
        if (CollectionUtils.isEmpty(sucursalList)) {
            
            return new ArrayList<Sucursal>();
        }
        
        return sucursalList;
	}
	
	public Boolean existsByDireccion(String direccion) {
		List<Sucursal> sucursalList = sucursalRepository.findByDireccion(direccion);
		if(CollectionUtils.isEmpty(sucursalList)) {
			return false;
		}
		return true;
	}
	
	public Sucursal addSucursal(Sucursal sucursal) {
		
		Sucursal sucursal2 = sucursalRepository.insert(sucursal);
		
		return sucursal2;
	}
	
	public Sucursal updateSucursal(Sucursal sucursal) {
		return sucursalRepository.save(sucursal);
	}
	
	public Boolean existsById(String id) {
		Optional<Sucursal> sucursal = sucursalRepository.findById(id);
		if(sucursal == null || sucursal.get() == null) {
			return false;
		}
		return true;
	}
	
	public void deleteSucursalById(String sucursalId) {
		sucursalRepository.deleteById(sucursalId);
	}
}
