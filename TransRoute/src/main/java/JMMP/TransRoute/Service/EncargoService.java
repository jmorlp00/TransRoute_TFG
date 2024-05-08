package JMMP.TransRoute.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import JMMP.TransRoute.Model.Encargo;
import JMMP.TransRoute.Model.Ruta;
import JMMP.TransRoute.Repository.EncargoRepository;

public class EncargoService {
	@Autowired
    private EncargoRepository encargoRepository;

    public List<Encargo> getAll() {
        return encargoRepository.findAll();
    }

    public Optional<Encargo> findById(String id) {
        return encargoRepository.findById(id);
    }

    public Encargo insert(Encargo encargo) {
    	if(!validateEncargo(encargo)) {
    		return null;
    	}
        return encargoRepository.insert(encargo);
    }

    public Encargo update(Encargo encargo) {
    	if(!validateEncargo(encargo)) {
    		return null;
    	}
        return encargoRepository.save(encargo);
    }

    public void deleteById(String id) {
        encargoRepository.deleteById(id);
    }
    
    private boolean validateEncargo(Encargo encargo) {
        Ruta ruta = encargo.getRuta();
        if (ruta != null) {
            if (encargo.getTransportista().getAltura() > ruta.getAltura()) {
            	System.out.println("La altura del transportista no puede ser mayor que la de la ruta.");
                return false;
            }
            if (encargo.getTransportista().getMma() > ruta.getMma()) {
            	System.out.println("El MMA del transportista no puede ser mayor que el de la ruta.");
            	return false;
            }
            if (encargo.getTransportista().getLongitud() > ruta.getLongitud()) {
            	System.out.println("La longitud del transportista no puede ser mayor que la de la ruta.");
            	return false;
            }
        } else {
        	System.out.println("El encargo debe tener una ruta asociada.");
        	return false;
        }
        return true;
    }
}
