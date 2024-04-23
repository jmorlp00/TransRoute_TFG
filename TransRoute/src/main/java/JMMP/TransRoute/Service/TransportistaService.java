package JMMP.TransRoute.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

import JMMP.TransRoute.Model.Gerente;
import JMMP.TransRoute.Model.Transportista;
import JMMP.TransRoute.Repository.TransportistaRepository;

public class TransportistaService {
	@Autowired
	TransportistaRepository	transportistaRepository;
	
	public List<Transportista> getAll(){
		List<Transportista> transportistaList = transportistaRepository.findAll();
        if (CollectionUtils.isEmpty(transportistaList)) {
            
            return new ArrayList<Transportista>();
        }
        
        return transportistaList;
	}
	
	public Transportista getTransportistaById(String id) {
		
		Optional<Transportista> optionalTransportista = transportistaRepository.findById(id);
		
		if(optionalTransportista == null || optionalTransportista.get() == null) {
			return null;
		}
		
		Transportista transportista = optionalTransportista.get();
		return transportista;
	}
	
	public Transportista addTransportista(Transportista transportista) {
		
		Transportista transportista2 = transportistaRepository.insert(transportista);
		
		return transportista2;
	}
	
	public Boolean existsByEmail(String email) {
		List<Transportista> transportistaList = transportistaRepository.findByEmail(email);
		if(CollectionUtils.isEmpty(transportistaList)) {
			return false;
		}
		return true;
	}
}
