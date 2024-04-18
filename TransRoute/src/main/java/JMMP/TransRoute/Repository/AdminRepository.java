package JMMP.TransRoute.Repository;

import java.util.List;

import JMMP.TransRoute.Model.Admin;

public interface AdminRepository {

	Admin findByAdminId(String adminId);

	Admin findByUserId(String userId);
	
	void insertAdmin(String userId);

}
