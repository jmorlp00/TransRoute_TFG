package JMMP.TransRoute.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import JMMP.TransRoute.Service.UserService;
import JMMP.TransRoute.Model.User;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping("/users/{name}")
	public List<User> getUserByName(@PathVariable String name) {
		List usersList = userService.getUserByName(name);

		return usersList;
	}

	@PostMapping("/users/save")
	public User addUser(@RequestBody User user) {
		return userService.addUser(user);
	}
}
