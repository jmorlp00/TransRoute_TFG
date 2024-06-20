package JMMP.TransRoute.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import JMMP.TransRoute.Model.Encargo;
import JMMP.TransRoute.Service.EncargoService;
import JMMP.TransRoute.Service.RutaService;
import JMMP.TransRoute.Service.TransportistaService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/encargo")
public class EncargoController {
    @Autowired
    private EncargoService encargoService;
    
	@Autowired
	private TransportistaService transportistaService;
	
	@Autowired
	private RutaService rutaService;
	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/")
    public List<Encargo> getAllEncargos() {
        return encargoService.getAll();
    }
	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/add")
    public Encargo addEncargo(@RequestBody Encargo encargo, @RequestParam(required = true) String rutaId, @RequestParam(required = true) String transportistaId) {
		encargo.setRuta(rutaService.findById(rutaId));
		encargo.setTransportista(transportistaService.getTransportistaById(transportistaId));
        return encargoService.insert(encargo);
    }
	
	@CrossOrigin(origins = "http://localhost:3000")
    @PatchMapping("/{encargoId}")
    public Encargo updateEncargo(@RequestBody Encargo encargo, @RequestParam(required = true) String rutaId, @RequestParam(required = true) String transportistaId, @PathVariable String encargoId) {
		Encargo encargo2 = encargoService.findById(encargoId).get();
		encargo2.setFechaEntrega(encargo.getFechaEntrega());
		encargo2.setFechaSalida(encargo.getFechaSalida());
		encargo2.setRuta(rutaService.findById(rutaId));
		encargo2.setTransportista(transportistaService.getTransportistaById(transportistaId));

        return encargoService.update(encargo2);
    }
	
	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{encargoId}")
    public Encargo getEncargoById(@PathVariable String encargoId) {
        return encargoService.findById(encargoId).orElse(null);
    }
	@CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{encargoId}")
    public void deleteEncargo(@PathVariable String encargoId) {
        encargoService.deleteById(encargoId);
    }
}
