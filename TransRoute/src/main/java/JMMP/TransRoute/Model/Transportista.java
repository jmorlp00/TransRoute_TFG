package JMMP.TransRoute.Model;


import org.springframework.data.mongodb.core.mapping.DBRef;

public class Transportista extends User{

	
	@DBRef
	private Gerente gerenteId;
	
	@DBRef
	private Sucursal sucursalId;
	
	private String matricula;
	
	private double mma;
	
	private double altura;
	
	private double longitud;




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

	public Sucursal getSucursalId() {
		return sucursalId;
	}

	public void setSucursalId(Sucursal sucursalId) {
		this.sucursalId = sucursalId;
	}
	

}
