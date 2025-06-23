
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LocationData {
  country: string;
  percentage: number;
  flag: string;
  coordinates: [number, number];
}

interface GeographicMapProps {
  locationData: LocationData[];
}

const GeographicMap: React.FC<GeographicMapProps> = ({ locationData }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // You'll need to add your Mapbox token here
    // For now, using a placeholder - users should add their token
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'mercator',
      zoom: 1.5,
      center: [20, 20],
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each location
    locationData.forEach((location) => {
      if (map.current) {
        // Create a marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.style.width = `${Math.max(12, location.percentage)}px`;
        markerElement.style.height = `${Math.max(12, location.percentage)}px`;
        markerElement.style.backgroundColor = '#3B82F6';
        markerElement.style.borderRadius = '50%';
        markerElement.style.border = '2px solid white';
        markerElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        markerElement.style.cursor = 'pointer';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="text-sm">
              <div class="font-semibold">${location.flag} ${location.country}</div>
              <div class="text-gray-600">${location.percentage}% des candidatures</div>
            </div>
          `);

        // Add marker to map
        new mapboxgl.Marker(markerElement)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map.current);
      }
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [locationData]);

  return (
    <div className="relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      {!mapboxgl.accessToken || mapboxgl.accessToken === 'YOUR_MAPBOX_TOKEN_HERE' ? (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
          <div className="text-center">
            <div className="mb-2">🗺️ Carte interactive</div>
            <div>Veuillez configurer votre token Mapbox</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GeographicMap;
