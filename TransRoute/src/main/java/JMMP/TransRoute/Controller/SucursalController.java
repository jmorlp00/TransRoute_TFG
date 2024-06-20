package JMMP.TransRoute.Controller;

import java.util.Collections;
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
import org.springframework.web.bind.annotation.RestController;

import JMMP.TransRoute.Model.Sucursal;
import JMMP.TransRoute.Model.User;
import JMMP.TransRoute.Service.SucursalService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/sucursal")
public class SucursalController {

	@Autowired
	private SucursalService sucursalService;
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/")
	public List<Sucursal> getAllSucursales(){
		List<Sucursal> allUsers = sucursalService.getAll();


		// Ordenar por el campo nombre
		Collections.sort(allUsers, (u1, u2) -> u1.getNombre().compareTo(u2.getNombre()));

		return allUsers;
		
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/{sucursalId}")
	public Sucursal getSucursalById(@PathVariable String sucursalId){




		return sucursalService.getSucursalById(sucursalId);
		
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/add")
	public Sucursal addSucursal(@RequestBody Sucursal sucursal) {
		if (sucursalService.existsByDireccion(sucursal.getDireccion())) {
			return null;
		}
		
		return sucursalService.addSucursal(sucursal);
		
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@PatchMapping("/{sucursalId}")
	public Sucursal modifySucursal(@RequestBody Sucursal sucursal, @PathVariable String sucursalId) {
		if (!sucursalService.existsByDireccion(sucursal.getDireccion())) {
			return null;
		}
		
		Sucursal sucursal2 = new Sucursal();
		
		sucursal2.setId(sucursalId);
		sucursal2.setNombre(sucursal.getNombre());
		sucursal2.setTelefono(sucursal.getTelefono());
		sucursal2.setDireccion(sucursal.getDireccion());
		sucursal2.setCorreo(sucursal.getCorreo());
		
		return sucursalService.updateSucursal(sucursal2);
		
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/{sucursalId}")
	public void deleteSucursal(@PathVariable String sucursalId) {
		if (!sucursalService.existsById(sucursalId)) {
			return;
		}
		
		sucursalService.deleteSucursalById(sucursalId);
	}
}
