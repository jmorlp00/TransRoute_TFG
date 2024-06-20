package JMMP.TransRoute.Controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import JMMP.TransRoute.Model.Transportista;
import JMMP.TransRoute.Model.User;
import JMMP.TransRoute.Service.TransportistaService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/transportistas")
public class TransportistaController {
    @Autowired
    private TransportistaService transportistaService;
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/")
	public List<Transportista> getAllUsers() {
		List<Transportista> allTransportistas = transportistaService.getAll();
		Collections.sort(allTransportistas, (u1, u2) -> u1.getEmail().compareTo(u2.getEmail()));
		return allTransportistas;
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/sucursal/")
	public Object getTransportistasBySucursal(@RequestParam(required = true) String sucursalId) {
		List<Transportista> sucursalTransportista = transportistaService.getTransportistaBySucursal(sucursalId);
		Collections.sort(sucursalTransportista, (u1, u2) -> u1.getEmail().compareTo(u2.getEmail()));
		return sucursalTransportista;
	}
	
}
