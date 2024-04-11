package JMMP.TransRoute.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Gerente {
	@Id
	private String Id;
	
	@DBRef
	private User userId;
	
	private Sucursal sucursalId;

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	public Sucursal getSucursalId() {
		return sucursalId;
	}

	public void setSucursalId(Sucursal sucursalId) {
		this.sucursalId = sucursalId;
	}
	
	
}
