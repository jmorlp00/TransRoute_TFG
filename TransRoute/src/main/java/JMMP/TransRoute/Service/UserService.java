package JMMP.TransRoute.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import JMMP.TransRoute.Model.Admin;
import JMMP.TransRoute.Model.Gerente;
import JMMP.TransRoute.Model.Transportista;
import JMMP.TransRoute.Model.User;
import JMMP.TransRoute.Repository.AdminRepository;
import JMMP.TransRoute.Repository.GerenteRepository;
import JMMP.TransRoute.Repository.TransportistaRepository;
import JMMP.TransRoute.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
    @Autowired
    GerenteRepository gerenteRepository;

    @Autowired
    TransportistaRepository transportistaRepository;

    @Autowired
    AdminRepository adminRepository;
	
	public User getUserById(String id) {
		
		Optional<User> optionalUser = userRepository.findById(id);
		
		if(optionalUser == null || optionalUser.get() == null) {
			return null;
		}
		
		User user = optionalUser.get();
		return user;
	}
	
	public List<User> getUserByEmail(String email) {
        

		 List<User> userList = new ArrayList<>();

	        // Buscar en UserRepository
	        List<User> users = userRepository.findByEmail(email);
	        if (!CollectionUtils.isEmpty(users)) {
	            userList.addAll(users);
	        }

	        // Buscar en GerenteRepository
	        List<Gerente> gerentes = gerenteRepository.findByEmail(email);
	        if (!CollectionUtils.isEmpty(gerentes)) {
	            userList.addAll(gerentes);
	        }

	        // Buscar en TransportistaRepository
	        List<Transportista> transportistas = transportistaRepository.findByEmail(email);
	        if (!CollectionUtils.isEmpty(transportistas)) {
	            userList.addAll(transportistas);
	        }

	        // Buscar en AdminRepository
	        List<Admin> admins = adminRepository.findByEmail(email);
	        if (!CollectionUtils.isEmpty(admins)) {
	            userList.addAll(admins);
	        }

	        return userList;
    }
	
	public User addUser(User user) {
		User user2 = userRepository.insert(user);
		
		return user2;
	}
	
	public List<User> getAll(){
		List<User> userList = userRepository.findAll();
        if (CollectionUtils.isEmpty(userList)) {
            
            return new ArrayList<User>();
        }
        
        return userList;
	}
	
	public Boolean existsByEmail(String email) {
		List<User> userList = userRepository.findByEmail(email);
		if(CollectionUtils.isEmpty(userList)) {
			return false;
		}
		return true;
	}
	
	public void deleteUserById(String userId) {
		userRepository.deleteById(userId);
	}
	
	public User updateUser(User user) {
		return userRepository.save(user);
	}
	
	public Boolean existsById(String id) {
		Optional<User> optionalUser = userRepository.findById(id);
		if(optionalUser == null || optionalUser.get() == null) {
			return false;
		}
		return true;
	}
}
