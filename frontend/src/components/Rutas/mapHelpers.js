// mapHelpers.js
export function cleanupPreviousMap(mapInstanceRef) {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.dispose();
      mapInstanceRef.current = null;
    }
  }
  
  export function initializeMap(mapContainerRef, mapInstanceRef, behaviorRef) {
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
  
  export function loadScript(src, onload) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = onload;
    document.head.appendChild(script);
  }
  
  export function createMarkerElement(markerIndex) {
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
  
  export function addMarkerDragEvents(map, marker, behaviorRef, updateRoutes) {
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
  
  export function addRandomMarker(mapInstanceRef, markersRef, behaviorRef, updateRoutes) {
    if (mapInstanceRef.current) {
      const map = mapInstanceRef.current;
  
      const center = { lat: 42.598726, lng: -5.567095 };
  
      function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }
  
      function getDistanceInDegrees(km) {
        return km / 111;
      }
  
      const latOffset = getRandomInRange(-getDistanceInDegrees(2.5), getDistanceInDegrees(2.5));
      const lngOffset = getRandomInRange(-getDistanceInDegrees(2.5), getDistanceInDegrees(2.5));
  
      const randomLat = center.lat + latOffset;
      const randomLng = center.lng + lngOffset;
  
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
  
      updateRoutes();
    }
  }
  
  export function showMarkerCoordinates(markersRef) {
    const coordinates = markersRef.current.map(marker => marker.getGeometry());
    const coordStrings = coordinates.map(coord => `Lat: ${coord.lat}, Lng: ${coord.lng}`).join('\n');
    alert(`Marker Coordinates:\n${coordStrings}`);
  }
  
  export function updateRoutes(mapInstanceRef, markersRef, routesRef) {
    if (mapInstanceRef.current && markersRef.current.length > 1) {
      const platform = new window.H.service.Platform({
        apikey: 'nKMF9BXUb04kdr3KAT65i8qJfd3llvjgSWwQgoLYdkY'
      });
      const routingService = platform.getRoutingService(null, 8);
  
      routesRef.current.forEach(route => mapInstanceRef.current.removeObject(route));
      routesRef.current = [];
  
      for (let i = 0; i < markersRef.current.length - 1; i++) {
        const start = markersRef.current[i].getGeometry();
        const end = markersRef.current[i + 1].getGeometry();
  
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
  