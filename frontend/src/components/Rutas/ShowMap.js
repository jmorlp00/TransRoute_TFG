import React, { useEffect, useRef } from 'react';

function cleanupPreviousMap(mapInstanceRef) {
  if (mapInstanceRef.current) {
    mapInstanceRef.current.dispose();
    mapInstanceRef.current = null;
  }
}

function initializeMap(mapContainerRef, mapInstanceRef, behaviorRef, centerCoordinate) {
    cleanupPreviousMap(mapInstanceRef);
  
    const platform = new window.H.service.Platform({
      apikey: 'nKMF9BXUb04kdr3KAT65i8qJfd3llvjgSWwQgoLYdkY',
    });
  
    const defaultLayers = platform.createDefaultLayers();
  
    const map = new window.H.Map(mapContainerRef.current, defaultLayers.vector.normal.map, {
      center: { lat: centerCoordinate.latitud, lng: centerCoordinate.longitud },
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

function updateRoutes(mapInstanceRef, routesRef, coordinates) {
  if (mapInstanceRef.current && coordinates.length > 1) {
    const platform = new window.H.service.Platform({
      apikey: 'nKMF9BXUb04kdr3KAT65i8qJfd3llvjgSWwQgoLYdkY'
    });
    const routingService = platform.getRoutingService(null, 8);

    // Elimina las rutas previas
    routesRef.current.forEach(route => mapInstanceRef.current.removeObject(route));
    routesRef.current = [];

    for (let i = 0; i < coordinates.length - 1; i++) {
      const start = coordinates[i];
      const end = coordinates[i + 1];

      const routeRequestParams = {
        routingMode: 'fast',
        transportMode: 'car',
        origin: `${start.latitud},${start.longitud}`,
        destination: `${end.latitud},${end.longitud}`,
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

export default function Ruta({ coordinates, st }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const behaviorRef = useRef(null);
  const routesRef = useRef([]);
  const style = st || { height: '70vh', width: '100vw' };
  useEffect(() => {
    if (!mapInstanceRef.current) {
      loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js', () => {
        loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js', () => {
          loadScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js', () => {
            loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js', () => {
              initializeMap(mapContainerRef, mapInstanceRef, behaviorRef, coordinates[0]); // Use the first coordinate as center
              updateRoutes(mapInstanceRef, routesRef, coordinates); // Update routes initially
            });
          });
        });
      });
    } else {
      initializeMap(mapContainerRef, mapInstanceRef, behaviorRef, coordinates[0]); // Use the first coordinate as center
      updateRoutes(mapInstanceRef, routesRef, coordinates); // Update routes if map already exists
    }

  }, []);
  
  return (
    <div>
      <div id="map" ref={mapContainerRef} style={style} />
    </div>
  );
}
