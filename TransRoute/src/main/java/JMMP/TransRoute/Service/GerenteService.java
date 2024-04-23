package JMMP.TransRoute.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

import JMMP.TransRoute.Model.Gerente;
import JMMP.TransRoute.Repository.GerenteRepository;

public class GerenteService {
	@Autowired
	GerenteRepository gerenteRepository;
	
	public List<Gerente> getAll(){
		List<Gerente> gerenteList = gerenteRepository.findAll();
        if (CollectionUtils.isEmpty(gerenteList)) {
            
            return new ArrayList<Gerente>();
        }
        
        return gerenteList;
	}
	
	public Gerente getGerenteById(String id) {
		
		Optional<Gerente> optionalGerente = gerenteRepository.findById(id);
		
		if(optionalGerente == null || optionalGerente.get() == null) {
			return null;
		}
		
		Gerente gerente = optionalGerente.get();
		return gerente;
	}
	
	public Gerente addGerente(Gerente gerente) {
		
		Gerente gerente2 = gerenteRepository.insert(gerente);
		
		return gerente2;
	}
	
	public Boolean existsByEmail(String email) {
		List<Gerente> gerenteList = gerenteRepository.findByEmail(email);
		if(CollectionUtils.isEmpty(gerenteList)) {
			return false;
		}
		return true;
	}

}
