package JMMP.TransRoute.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import JMMP.TransRoute.Model.Gerente;
import JMMP.TransRoute.Model.User;
import JMMP.TransRoute.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	public User getUserById(String id) {
		
		Optional<User> optionalUser = userRepository.findById(id);
		
		if(optionalUser == null || optionalUser.get() == null) {
			return null;
		}
		
		User user = optionalUser.get();
		return user;
	}
	
	public List<User> getUserByName(String name) {
        

        List<User> userList = userRepository.findByName(name);

        if (CollectionUtils.isEmpty(userList)) {
            
            return new ArrayList<User>();
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
}
