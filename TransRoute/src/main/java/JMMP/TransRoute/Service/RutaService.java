package JMMP.TransRoute.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import JMMP.TransRoute.Model.Admin;
import JMMP.TransRoute.Model.Ruta;
import JMMP.TransRoute.Repository.RutaRepository;
import lombok.extern.slf4j.Slf4j;
@Service
@Slf4j
public class RutaService {
	
	@Autowired
	private RutaRepository rutaRepository;
	
    public List<Ruta> getAll(){
        List<Ruta> rutaList = rutaRepository.findAll();
        if (CollectionUtils.isEmpty(rutaList)) {
            return new ArrayList<>();
        }
        return rutaList;
    }
    
    public Ruta findById(String id) {
        return rutaRepository.findById(id).get();
    }
    
    public boolean existsByNombre(String nombre) {
    	List<Ruta> adminList = rutaRepository.findRutaByNombre(nombre);
		if(CollectionUtils.isEmpty(adminList)) {
			return false;
		}
		return true;
    }
    public boolean existsById(String id) {
		Optional<Ruta> optionalUser = rutaRepository.findById(id);
		if(optionalUser == null || optionalUser.get() == null) {
			return false;
		}
		return true;
    }
    
    public Ruta addRuta(Ruta ruta) {
        return rutaRepository.insert(ruta);
    }

    public Ruta updateRuta(Ruta ruta) {
        return rutaRepository.save(ruta);
    }

    public void deleteRutaById(String id) {
        rutaRepository.deleteById(id);
    }

}
