package JMMP.TransRoute.Model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Encargo {
	@Id
	private String Id;
	
	@DBRef
	private Transportista transportista;
	
	@DBRef
	private Ruta ruta;
	
	private Date fechaSalida;
	
	private Date fechaEntrega;

}
