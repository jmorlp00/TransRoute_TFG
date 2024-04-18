package JMMP.TransRoute.Model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Encargo {
	@Id
	private String Id;
	
	@DBRef
	private Transportista transportistaId;
	
	@DBRef
	private Ruta rutaId;
	
	private Date fechaSalida;
	
	private Date fechaEntrega;

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public Transportista getTransportista() {
		return transportistaId;
	}

	public void setTransportista(Transportista transportistaId) {
		this.transportistaId = transportistaId;
	}

	public Ruta getRuta() {
		return rutaId;
	}

	public void setRuta(Ruta rutaId) {
		this.rutaId = rutaId;
	}

	public Date getFechaSalida() {
		return fechaSalida;
	}

	public void setFechaSalida(Date fechaSalida) {
		this.fechaSalida = fechaSalida;
	}

	public Date getFechaEntrega() {
		return fechaEntrega;
	}

	public void setFechaEntrega(Date fechaEntrega) {
		this.fechaEntrega = fechaEntrega;
	}
	
	

}
