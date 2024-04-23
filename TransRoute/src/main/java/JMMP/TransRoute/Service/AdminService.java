package JMMP.TransRoute.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import JMMP.TransRoute.Model.Admin;
import JMMP.TransRoute.Model.User;
import JMMP.TransRoute.Repository.AdminRepository;
import JMMP.TransRoute.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AdminService {
	
	@Autowired
	AdminRepository adminRespository;
	

	public List<Admin> getAll(){
		List<Admin> adminList = adminRespository.findAll();
        if (CollectionUtils.isEmpty(adminList)) {
            
            return new ArrayList<Admin>();
        }
        
        return adminList;
	}
	
	public Admin getAdminByAdminId(String id) {
		
		Optional<Admin> optionalAdmin = adminRespository.findById(id);
		
		if(optionalAdmin == null || optionalAdmin.get() == null) {
			return null;
		}
		
		Admin admin = optionalAdmin.get();
		return admin;
	}
	


	
	public Admin addAdmin(Admin admin) {
		
		Admin admin2 = adminRespository.insert(admin);
		
		return admin2;
	}
	
	public Boolean existsByEmail(String email) {
		List<Admin> adminList = adminRespository.findByEmail(email);
		if(CollectionUtils.isEmpty(adminList)) {
			return false;
		}
		return true;
	}
	

}
