package JMMP.TransRoute.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import JMMP.TransRoute.Model.Admin;

import JMMP.TransRoute.Service.AdminService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/admins")
public class AdminController {
	
    @Autowired
    private AdminService adminService;
    
	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/save")
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.addAdmin(admin);
    }
}
