package JMMP.TransRoute.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import JMMP.TransRoute.Model.Encargo;
import JMMP.TransRoute.Service.EncargoService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/encargo")
public class EncargoController {
    @Autowired
    private EncargoService encargoService;

    @GetMapping("/")
    public List<Encargo> getAllEncargos() {
        return encargoService.getAll();
    }

    @PostMapping("/add")
    public Encargo addEncargo(@RequestBody Encargo encargo) {
        return encargoService.insert(encargo);
    }

    @GetMapping("/{encargoId}")
    public Encargo getEncargoById(@PathVariable String encargoId) {
        return encargoService.findById(encargoId).orElse(null);
    }

    @DeleteMapping("/{encargoId}")
    public void deleteEncargo(@PathVariable String encargoId) {
        encargoService.deleteById(encargoId);
    }
}
