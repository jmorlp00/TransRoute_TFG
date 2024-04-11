package JMMP.TransRoute.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Transportista {
	@Id
	private String Id;
	
	@DBRef
	private User userId;
	
	@DBRef
	private Gerente gerenteId;
	
	private String matricula;
	
	private double mma;
	
	private double altura;
	
	private double longitud;

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

	public Gerente getGerenteId() {
		return gerenteId;
	}

	public void setGerenteId(Gerente gerenteId) {
		this.gerenteId = gerenteId;
	}

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}

	public double getMma() {
		return mma;
	}

	public void setMma(double mma) {
		this.mma = mma;
	}

	public double getAltura() {
		return altura;
	}

	public void setAltura(double altura) {
		this.altura = altura;
	}

	public double getLongitud() {
		return longitud;
	}

	public void setLongitud(double longitud) {
		this.longitud = longitud;
	}
	

}
