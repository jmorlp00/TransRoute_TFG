package JMMP.TransRoute.Controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import JMMP.TransRoute.Service.AdminService;
import JMMP.TransRoute.Service.GerenteService;
import JMMP.TransRoute.Service.SucursalService;
import JMMP.TransRoute.Service.TransportistaService;
import JMMP.TransRoute.Service.UserService;
import JMMP.TransRoute.Model.Admin;
import JMMP.TransRoute.Model.Gerente;
import JMMP.TransRoute.Model.Transportista;
import JMMP.TransRoute.Model.User;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private AdminService adminService;
	@Autowired
	private GerenteService gerenteService;
	@Autowired
	private TransportistaService transportistaService;
	@Autowired
	private SucursalService sucursalService;

	@GetMapping("/")
	public List<User> getAllUsers() {
		List<User> allUsers = userService.getAll();
		allUsers.addAll(adminService.getAll());
		allUsers.addAll(gerenteService.getAll());
		allUsers.addAll(transportistaService.getAll());

		// Ordenar por el campo nombre
		Collections.sort(allUsers, (u1, u2) -> u1.getEmail().compareTo(u2.getEmail()));

		return allUsers;
	}

	/**
	 * Metodo para insertar todos los tipos de usuarios teniendo en cuenta de no
	 * repetir el email. Devuelve el usuario que se acaba de insertar o error en
	 * caso de no haber insertado nada
	 * 
	 * @param user
	 * @param altura
	 * @param mma
	 * @param longitud
	 * @param sucursalId
	 * @return
	 */
	@PostMapping("/add")
	public Object addUser(@RequestBody User user, @RequestParam(required = false) Double altura,
			@RequestParam(required = false) Double mma, @RequestParam(required = false) Double longitud,
			@RequestParam(required = false) String sucursalId) {
		// Comprobar que existe algún tipo de usuario con ese email
		if (!(userService.existsByEmail(user.getEmail()) || adminService.existsByEmail(user.getEmail())
				|| gerenteService.existsByEmail(user.getEmail())
				|| transportistaService.existsByEmail(user.getEmail()))) {
			return null;
		}

		switch (user.getRole()) {
		case "admin":
			Admin admin = new Admin();
			admin.setName(user.getName());
			admin.setSurname(user.getSurname());
			admin.setAge(user.getAge());
			admin.setRole(user.getRole());
			admin.setEmail(user.getEmail());
			admin.setPassword(user.getPassword());
			return adminService.addAdmin(admin);

		case "gerente":
			Gerente gerente = new Gerente();
			gerente.setName(user.getName());
			gerente.setSurname(user.getSurname());
			gerente.setAge(user.getAge());
			gerente.setRole(user.getRole());
			gerente.setEmail(user.getEmail());
			gerente.setPassword(user.getPassword());
			if (sucursalId != null) {
				gerente.setSucursalId(sucursalService.getSucursalById(sucursalId));
			} else {
				gerente.setSucursalId(null);
			}

		case "transportista":
			Transportista transportista = new Transportista();
			transportista.setName(user.getName());
			transportista.setSurname(user.getSurname());
			transportista.setAge(user.getAge());
			transportista.setRole(user.getRole());
			transportista.setEmail(user.getEmail());
			// Setear campos específicos de Transportista desde el RequestBody
			if (altura != null) {
				transportista.setAltura(altura);
			}
			if (mma != null) {
				transportista.setMma(mma);
			}
			if (longitud != null) {
				transportista.setMma(longitud);
			}

			return transportistaService.addTransportista(transportista);
		default:
			return userService.addUser(user);
		}

	}

	@PatchMapping("/{userId}")
	public Object modifyUser(@PathVariable String userId, @RequestBody User user,
			@RequestParam(required = false) Double altura, @RequestParam(required = false) Double mma,
			@RequestParam(required = false) Double longitud, @RequestParam(required = false) String sucursalId) {

		boolean changeRole = false;
		String actualRole = "";
		// Compruebo a que colección pertenece y seteo las variables auxiliares
		if (userService.getUserById(userId) != null) {
			if (user.getRole() != "") {
				changeRole = true;
			}
		} else if (adminService.getAdminByAdminId(userId) != null) {
			if (user.getRole() != "admin") {
				changeRole = true;
			}
		} else if (gerenteService.getGerenteById(userId) != null) {
			if (user.getRole() != "gerente") {
				changeRole = true;
			}
		} else if (transportistaService.getTransportistaById(userId) != null) {
			if (user.getRole() != "transportista") {
				changeRole = true;
			}
		} else {
			return "Error";
		}

		if (changeRole) {
			switch (actualRole) {
			case "admin":
				adminService.deleteAdminById(userId);
				break;
			case "gerente":
				gerenteService.deleteGerenteById(userId);
				break;
			case "transportista":
				transportistaService.deleteTransportistaById(userId);
				break;
			default:
				userService.deleteUserById(userId);
			}
			switch (user.getRole()) {
			case "admin":
				Admin admin = new Admin();
				admin.setName(user.getName());
				admin.setSurname(user.getSurname());
				admin.setAge(user.getAge());
				admin.setRole(user.getRole());
				admin.setEmail(user.getEmail());
				admin.setPassword(user.getPassword());
				return adminService.addAdmin(admin);

			case "gerente":
				Gerente gerente = new Gerente();
				gerente.setName(user.getName());
				gerente.setSurname(user.getSurname());
				gerente.setAge(user.getAge());
				gerente.setRole(user.getRole());
				gerente.setEmail(user.getEmail());
				gerente.setPassword(user.getPassword());
				if (sucursalId != null) {
					gerente.setSucursalId(sucursalService.getSucursalById(sucursalId));
				} else {
					gerente.setSucursalId(null);
				}
				return gerenteService.addGerente(gerente);
			case "transportista":
				Transportista transportista = new Transportista();
				transportista.setName(user.getName());
				transportista.setSurname(user.getSurname());
				transportista.setAge(user.getAge());
				transportista.setRole(user.getRole());
				transportista.setEmail(user.getEmail());
				// Setear campos específicos de Transportista desde el RequestBody
				if (altura != null) {
					transportista.setAltura(altura);
				}
				if (mma != null) {
					transportista.setMma(mma);
				}
				if (longitud != null) {
					transportista.setMma(longitud);
				}

				return transportistaService.addTransportista(transportista);
			default:
				return userService.addUser(user);
			}

		} else {
			switch (user.getRole()) {
			case "admin":
				Admin admin = new Admin();
				admin.setId(userId);
				admin.setName(user.getName());
				admin.setSurname(user.getSurname());
				admin.setAge(user.getAge());
				admin.setRole(user.getRole());
				admin.setEmail(user.getEmail());
				admin.setPassword(user.getPassword());
				return adminService.updateAdmin(admin);

			case "gerente":
				Gerente gerente = new Gerente();
				gerente.setId(userId);
				gerente.setName(user.getName());
				gerente.setSurname(user.getSurname());
				gerente.setAge(user.getAge());
				gerente.setRole(user.getRole());
				gerente.setEmail(user.getEmail());
				gerente.setPassword(user.getPassword());
				if (sucursalId != null) {
					gerente.setSucursalId(sucursalService.getSucursalById(sucursalId));
				} else {
					gerente.setSucursalId(null);
				}
				return gerenteService.updateGerente(gerente);
			case "transportista":
				Transportista transportista = new Transportista();
				transportista.setId(userId);
				transportista.setName(user.getName());
				transportista.setSurname(user.getSurname());
				transportista.setAge(user.getAge());
				transportista.setRole(user.getRole());
				transportista.setEmail(user.getEmail());
				// Setear campos específicos de Transportista desde el RequestBody
				if (altura != null) {
					transportista.setAltura(altura);
				}
				if (mma != null) {
					transportista.setMma(mma);
				}
				if (longitud != null) {
					transportista.setMma(longitud);
				}

				return transportistaService.updateTransportista(transportista);
			default:
				user.setId(userId);
				return userService.updateUser(user);
			}
		}

	}

	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable String userId) {
		String actualRole = "user";
		if (userService.existsById(userId)) {
			actualRole = "user";
		} else if (adminService.existsById(userId)) {
			actualRole = "admin";
		} else if (gerenteService.existsById(userId)) {
			actualRole = "gerente";
		} else if (transportistaService.existsById(userId)) {
			actualRole = "transportista";
		} else {

			return;
		}

		switch (actualRole) {
		case "admin":
			adminService.deleteAdminById(userId);
			break;
		case "gerente":
			gerenteService.deleteGerenteById(userId);
			break;
		case "transportista":
			transportistaService.deleteTransportistaById(userId);
			break;
		default:
			userService.deleteUserById(userId);
		}
	}
}
