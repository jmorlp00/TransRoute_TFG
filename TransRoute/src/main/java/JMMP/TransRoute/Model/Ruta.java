package JMMP.TransRoute.Model;

import org.springframework.data.annotation.Id;

public class Ruta {
	@Id
	private String Id;
	
	private String nombre;
	
	private double altura;
	
	private double mma;
	
	private double longitud;
	
    private Coordenada[] coordenadas;

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
	
    public Coordenada[] getCoordenadas() {
        return coordenadas;
    }

    public void setCoordenadas(Coordenada[] coordenadas) {
        this.coordenadas = coordenadas;
    }
    
	// Clase interna Coordenada
    public static class Coordenada {
        private double latitud;
        private double longitud;

        public double getLatitud() {
            return latitud;
        }

        public void setLatitud(double latitud) {
            this.latitud = latitud;
        }

        public double getLongitud() {
            return longitud;
        }

        public void setLongitud(double longitud) {
            this.longitud = longitud;
        }
    }
}
