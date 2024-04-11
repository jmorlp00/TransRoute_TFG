package JMMP.TransRoute.Model;

import org.springframework.data.annotation.Id;

public class Ruta {
	@Id
	private String Id;
	
	private String nombre;
	
	private double altura;
	
	private double mma;
	
	private double longitud;

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public double getAltura() {
		return altura;
	}

	public void setAltura(double altura) {
		this.altura = altura;
	}

	public double getMma() {
		return mma;
	}

	public void setMma(double mma) {
		this.mma = mma;
	}

	public double getLongitud() {
		return longitud;
	}

	public void setLongitud(double longitud) {
		this.longitud = longitud;
	}
	

}
