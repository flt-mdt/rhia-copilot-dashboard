
import React from 'react';

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
  // Convert real coordinates to SVG coordinates (simplified world map projection)
  const convertToSVGCoords = (lng: number, lat: number) => {
    // Simple linear projection for a basic world map (800x400 viewBox)
    const x = ((lng + 180) * 800) / 360;
    const y = ((90 - lat) * 400) / 180;
    return { x, y };
  };

  return (
    <div className="relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden border">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)' }}
      >
        {/* Simple world map outline */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.3"/>
          </pattern>
        </defs>
        
        {/* Grid background */}
        <rect width="800" height="400" fill="url(#grid)" />
        
        {/* Simplified continents */}
        <g fill="#cbd5e1" opacity="0.6">
          {/* Europe */}
          <ellipse cx="420" cy="120" rx="60" ry="40" />
          {/* Africa */}
          <ellipse cx="440" cy="200" rx="50" ry="80" />
          {/* Asia */}
          <ellipse cx="580" cy="140" rx="120" ry="60" />
          {/* North America */}
          <ellipse cx="180" cy="120" rx="80" ry="60" />
          {/* South America */}
          <ellipse cx="220" cy="260" rx="40" ry="70" />
          {/* Australia */}
          <ellipse cx="680" cy="280" rx="40" ry="25" />
        </g>
        
        {/* Data points for each location */}
        {locationData.map((location, index) => {
          const svgCoords = convertToSVGCoords(location.coordinates[0], location.coordinates[1]);
          const pointSize = Math.max(4, Math.min(20, location.percentage));
          
          return (
            <g key={location.country}>
              {/* Glow effect */}
              <circle
                cx={svgCoords.x}
                cy={svgCoords.y}
                r={pointSize + 3}
                fill="#3B82F6"
                opacity="0.2"
                className="animate-pulse"
              />
              {/* Main point */}
              <circle
                cx={svgCoords.x}
                cy={svgCoords.y}
                r={pointSize}
                fill="#3B82F6"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:fill-blue-600 transition-colors"
              />
              {/* Country label on hover */}
              <text
                x={svgCoords.x}
                y={svgCoords.y - pointSize - 8}
                textAnchor="middle"
                fontSize="10"
                fill="#374151"
                className="opacity-0 hover:opacity-100 transition-opacity pointer-events-none font-medium"
              >
                {location.flag} {location.country}
              </text>
              <text
                x={svgCoords.x}
                y={svgCoords.y - pointSize + 5}
                textAnchor="middle"
                fontSize="8"
                fill="#6B7280"
                className="opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
              >
                {location.percentage}%
              </text>
            </g>
          );
        })}
        
        {/* Legend */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="140" height="60" fill="white" stroke="#e5e7eb" rx="6" opacity="0.95" />
          <text x="10" y="18" fontSize="11" fill="#374151" fontWeight="600">Candidatures</text>
          <circle cx="20" cy="35" r="4" fill="#3B82F6" />
          <text x="35" y="40" fontSize="9" fill="#6B7280">Faible volume</text>
          <circle cx="20" cy="50" r="8" fill="#3B82F6" />
          <text x="35" y="55" fontSize="9" fill="#6B7280">Fort volume</text>
        </g>
      </svg>
      
      {/* Overlay info */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-600 border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Origine des candidatures</span>
        </div>
      </div>
    </div>
  );
};

export default GeographicMap;
