package JMMP.TransRoute.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Gerente extends User{

	

	@DBRef
	private Sucursal sucursalId;





	public Sucursal getSucursalId() {
		return sucursalId;
	}

	public void setSucursalId(Sucursal sucursalId) {
		this.sucursalId = sucursalId;
	}
	
	
}
