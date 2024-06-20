import React, { useEffect, useRef } from 'react';
import Button from '@mui/material/Button';


function cleanupPreviousMap(mapInstanceRef) {
  if (mapInstanceRef.current) {
    mapInstanceRef.current.dispose();
    mapInstanceRef.current = null;
  }
}

function initializeMap(mapContainerRef, mapInstanceRef, behaviorRef) {
  cleanupPreviousMap(mapInstanceRef);

  const platform = new window.H.service.Platform({
    apikey: 'nKMF9BXUb04kdr3KAT65i8qJfd3llvjgSWwQgoLYdkY',
  });

  const defaultLayers = platform.createDefaultLayers();

  const map = new window.H.Map(mapContainerRef.current, defaultLayers.vector.normal.map, {
    center: { lat: 42.598726, lng: -5.567095 },
    zoom: 13,
    pixelRatio: window.devicePixelRatio || 1,
  });

  mapInstanceRef.current = map;

  const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
  behaviorRef.current = behavior;

  window.H.ui.UI.createDefault(map, defaultLayers);

  window.addEventListener('resize', () => map.getViewPort().resize());

  return () => {
    window.removeEventListener('resize', () => map.getViewPort().resize());
    map.dispose();
  };
}

function loadScript(src, onload) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = onload;
  document.head.appendChild(script);
}

function createMarkerElement(markerIndex) {
  const markerElement = document.createElement('div');
  markerElement.innerText = markerIndex;
  markerElement.style.background = '#000';
  markerElement.style.color = '#fff';
  markerElement.style.borderRadius = '50%';
  markerElement.style.padding = '5px';
  markerElement.style.textAlign = 'center';
  markerElement.style.width = '30px';
  markerElement.style.height = '30px';
  return markerElement;
}

function addMarkerDragEvents(map, marker, behaviorRef, updateRoutes) {
  map.addEventListener('dragstart', (ev) => {
    const target = ev.target;
    if (target instanceof window.H.map.DomMarker) {
      behaviorRef.current.disable();
    }
  }, false);

  map.addEventListener('dragend', (ev) => {
    const target = ev.target;
    if (target instanceof window.H.map.DomMarker) {
      behaviorRef.current.enable();
      updateRoutes();
    }
  }, false);

  map.addEventListener('drag', (ev) => {
    const target = ev.target;
    const pointer = ev.currentPointer;
    if (target instanceof window.H.map.DomMarker) {
      target.setGeometry(map.screenToGeo(pointer.viewportX, pointer.viewportY));
    }
  }, false);
}




function showMarkerCoordinates(markersRef) {
  const coordinates = markersRef.current.map(marker => marker.getGeometry());
  const coordStrings = coordinates.map(coord => `Lat: ${coord.lat}, Lng: ${coord.lng}`).join('\n');
  alert(`Marker Coordinates:\n${coordStrings}`);
}

function updateRoutes(mapInstanceRef, markersRef, routesRef) {
  const markers = markersRef.current;

  if (mapInstanceRef.current) {
    const platform = new window.H.service.Platform({
      apikey: 'nKMF9BXUb04kdr3KAT65i8qJfd3llvjgSWwQgoLYdkY'
    });
    const routingService = platform.getRoutingService(null, 8);

    routesRef.current.forEach(route => mapInstanceRef.current.removeObject(route));
    routesRef.current = [];

    if (markers.length === 1) {
      // Si hay solo un marcador, calcular la ruta desde y hasta él mismo
      const marker = markers[0].getGeometry();
      const routeRequestParams = {
        routingMode: 'fast',
        transportMode: 'car',
        origin: `${marker.lat},${marker.lng}`,
        destination: `${marker.lat},${marker.lng}`,
        return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
      };

      routingService.calculateRoute(routeRequestParams, result => {
        if (result.routes.length) {
          result.routes[0].sections.forEach(section => {
            const linestring = window.H.geo.LineString.fromFlexiblePolyline(section.polyline);

            const routeLine = new window.H.map.Polyline(linestring, {
              style: { strokeColor: 'blue', lineWidth: 4 }
            });

            mapInstanceRef.current.addObject(routeLine);
            routesRef.current.push(routeLine);
          });
        }
      }, error => {
        console.error(error);
      });
    } else if (markers.length === 0) {
      // Si no hay marcadores, eliminar todas las rutas
      routesRef.current.forEach(route => mapInstanceRef.current.removeObject(route));
      routesRef.current = [];
    } else {
      // Si hay más de un marcador, calcular rutas entre marcadores consecutivos
      for (let i = 0; i < markers.length - 1; i++) {
        const start = markers[i].getGeometry();
        const end = markers[i + 1].getGeometry();

        const routeRequestParams = {
          routingMode: 'fast',
          transportMode: 'car',
          origin: `${start.lat},${start.lng}`,
          destination: `${end.lat},${end.lng}`,
          return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
        };

        routingService.calculateRoute(routeRequestParams, result => {
          if (result.routes.length) {
            result.routes[0].sections.forEach(section => {
              const linestring = window.H.geo.LineString.fromFlexiblePolyline(section.polyline);

              const routeLine = new window.H.map.Polyline(linestring, {
                style: { strokeColor: 'blue', lineWidth: 4 }
              });

              mapInstanceRef.current.addObject(routeLine);
              routesRef.current.push(routeLine);
            });
          }
        }, error => {
          console.error(error);
        });
      }
    }
  }
}

function loadMarkers(mapInstanceRef, markersRef, behaviorRef, updateRoutes, coordinates = null) {
  if (mapInstanceRef.current) {
    const map = mapInstanceRef.current;

    if (coordinates && Array.isArray(coordinates)) {
      // Agregar marcadores específicos
      coordinates.forEach((coord, index) => {
        const { latitud, longitud } = coord;
        const markerElement = createMarkerElement(index+1);
        const marker = new window.H.map.DomMarker(
          { lat: latitud, lng: longitud },
          { icon: new window.H.map.DomIcon(markerElement) }
        );
        marker.draggable = true;
        addMarkerDragEvents(map, marker, behaviorRef, updateRoutes);
        map.addObject(marker);
        markersRef.current.push(marker);
      });
    } else {
      // Agregar marcador aleatorio
      const mapCenter = map.getCenter(); // Obtenemos el centro del mapa
      const randomLat = mapCenter.lat ;
      const randomLng = mapCenter.lng ;
      const markerIndex = markersRef.current.length + 1;
      const markerElement = createMarkerElement(markerIndex);
      const marker = new window.H.map.DomMarker(
        { lat: randomLat, lng: randomLng },
        { icon: new window.H.map.DomIcon(markerElement) }
      );
      marker.draggable = true;
      addMarkerDragEvents(map, marker, behaviorRef, updateRoutes);
      map.addObject(marker);
      markersRef.current.push(marker);
    }

    updateRoutes();
  }
}



export { createMarkerElement, addMarkerDragEvents, updateRoutes, loadMarkers, showMarkerCoordinates };


function removeLastMarker(markersRef, updateRoutesWrapper) {
  const markers = markersRef.current;
  if (markers.length > 0) {
    const lastMarker = markers.pop();
    lastMarker && lastMarker.dispose(); // Elimina el marcador del mapa
    updateRoutesWrapper(); // Actualiza las rutas después de eliminar el marcador
  }
}

export default function HereMap({ mapContainerRef, mapInstanceRef, behaviorRef, markersRef, routesRef, updateRoutesWrapper, initialData }) {
  const buttonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: '1000',
  };

  const printMarkersButtonStyle = {
    position: 'absolute',
    top: '90px',
    right: '10px',
    zIndex: '1000',
  };

  const handlePrintMarkers = () => {
    showMarkerCoordinates(markersRef);
  };

  useEffect(() => {
    if (!mapInstanceRef.current) {
      loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js', () => {
        loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js', () => {
          loadScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js', () => {
            loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js', () => {
              initializeMap(mapContainerRef, mapInstanceRef, behaviorRef);
              if(initialData){
                if (markersRef.current.length >= initialData.coordenadas.length) {
                  markersRef.current.splice(0, initialData.coordenadas.length); // Eliminar los tres primeros elementos
                }
                loadMarkers(mapInstanceRef, markersRef, behaviorRef, updateRoutesWrapper, initialData.coordenadas);


              }
            });
          });
        });
      });
    } else {
      initializeMap(mapContainerRef, mapInstanceRef, behaviorRef, initialData.coordenadas);

    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '64vh' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => loadMarkers(mapInstanceRef, markersRef, behaviorRef, updateRoutesWrapper)}
        style={buttonStyle}
      >
        Nuevo Marcador
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => removeLastMarker(markersRef, updateRoutesWrapper)}
        style={{ ...buttonStyle, top: '50px' }} // Posicionamiento del botón
      >
        Eliminar marcador
      </Button>
      <div id="map" ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}



