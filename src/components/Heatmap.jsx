import { useEffect, useRef } from 'react';

export function Heatmap({ location }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!location || !window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 17,
      mapTypeId: 'roadmap',
      styles: [
        { featureType: 'poi', stylers: [{ visibility: 'off' }] }
      ]
    });

    // Crowd heatmap (demo data)
    const heatmapData = [
      new window.google.maps.LatLng(location.lat + 0.001, location.lng + 0.001),
      new window.google.maps.LatLng(location.lat - 0.0005, location.lng + 0.002),
    ];

    new window.google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: map,
      radius: 30
    });

    // Demo marker
    new window.google.maps.Marker({
      position: location,
      map: map,
      title: 'You are here',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#1e40af',
        fillOpacity: 1
      }
    });

  }, [location]);

  return (
    <div className="h-96 w-full relative">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-b-3xl"
        style={{ minHeight: '400px' }}
      />
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
        🔴 High crowd | 🟡 Medium | 🟢 Low
      </div>
    </div>
  );
}
