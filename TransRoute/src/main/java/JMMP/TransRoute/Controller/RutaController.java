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
import org.springframework.web.bind.annotation.RestController;

import JMMP.TransRoute.Model.Ruta;
import JMMP.TransRoute.Service.RutaService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/ruta")
public class RutaController {
    @Autowired
    private RutaService rutaService;

    @GetMapping("/")
    public List<Ruta> getAllRutas() {
        List<Ruta> allRutas = rutaService.getAll();

        // Ordenar por el campo nombre
        Collections.sort(allRutas, (r1, r2) -> r1.getNombre().compareTo(r2.getNombre()));

        return allRutas;
    }

    @PostMapping("/add")
    public Ruta addRuta(@RequestBody Ruta ruta) {
        if (ruta.getCoordenadas() == null || ruta.getCoordenadas().length < 2) {
        	throw new Error("Debe proporcionar al menos dos coordenadas.");
        }
        return rutaService.addRuta(ruta);
    }

    @PatchMapping("/{rutaId}")
    public Ruta modifyRuta(@RequestBody Ruta ruta, @PathVariable String rutaId) {
        if (ruta.getCoordenadas() == null || ruta.getCoordenadas().length < 2) {
            throw new IllegalArgumentException("Debe proporcionar al menos dos coordenadas para modificar una ruta");
        }
        ruta.setId(rutaId); // Establecer el ID de la ruta
        return rutaService.updateRuta(ruta);
    }

    @DeleteMapping("/{rutaId}")
    public void deleteRuta(@PathVariable String rutaId) {
        rutaService.deleteRutaById(rutaId);
    }

}
