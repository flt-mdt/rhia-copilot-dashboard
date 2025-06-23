
import React, { useEffect, useRef, useState } from 'react';

interface LocationData {
  country: string;
  percentage: number;
  flag: string;
  coordinates: [number, number];
  candidatures: number;
  matchPercentage: number;
}

interface InteractiveGlobeProps {
  locationData: LocationData[];
}

interface TooltipData {
  x: number;
  y: number;
  country: string;
  candidatures: number;
  matchPercentage: number;
  visible: boolean;
}

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ locationData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isHovered, setIsHovered] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipData>({ x: 0, y: 0, country: '', candidatures: 0, matchPercentage: 0, visible: false });
  const rotationRef = useRef(0);

  // Convert lat/lng to 3D coordinates
  const latLngToVector3 = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    
    return { x, y, z };
  };

  // Project 3D to 2D
  const project3DTo2D = (x: number, y: number, z: number, canvasWidth: number, canvasHeight: number) => {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const scale = 180;
    
    return {
      x: centerX + x * scale,
      y: centerY - y * scale,
      z: z
    };
  };

  // Draw detailed world map
  const drawWorldMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Simplified continent outlines
    const continents = [
      // North America
      { 
        name: 'North America',
        paths: [
          [[-130, 70], [-130, 50], [-120, 40], [-110, 32], [-95, 28], [-80, 25], [-75, 30], [-70, 45], [-65, 50], [-60, 55], [-70, 65], [-90, 70], [-130, 70]]
        ]
      },
      // Europe
      {
        name: 'Europe',
        paths: [
          [[-10, 71], [30, 71], [40, 60], [35, 50], [25, 45], [15, 40], [5, 35], [-5, 40], [-10, 50], [-10, 71]]
        ]
      },
      // Asia
      {
        name: 'Asia',
        paths: [
          [[40, 75], [180, 75], [180, 10], [100, 0], [70, 10], [50, 20], [40, 30], [35, 45], [40, 60], [40, 75]]
        ]
      },
      // Africa
      {
        name: 'Africa',
        paths: [
          [[15, 35], [50, 35], [50, 20], [45, 0], [40, -20], [35, -35], [20, -35], [10, -20], [5, 0], [10, 20], [15, 35]]
        ]
      },
      // South America
      {
        name: 'South America',
        paths: [
          [[-80, 15], [-70, 15], [-60, 10], [-50, 0], [-45, -20], [-55, -40], [-70, -55], [-80, -45], [-85, -20], [-90, 0], [-80, 15]]
        ]
      },
      // Australia
      {
        name: 'Australia',
        paths: [
          [[115, -10], [155, -10], [155, -45], [115, -45], [115, -10]]
        ]
      }
    ];

    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(147, 197, 253, 0.1)';

    continents.forEach(continent => {
      continent.paths.forEach(path => {
        ctx.beginPath();
        let first = true;
        
        path.forEach(([lng, lat]) => {
          const pos3D = latLngToVector3(lat, lng + rotationRef.current, 1);
          if (pos3D.z > 0) {
            const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, width, height);
            
            if (first) {
              ctx.moveTo(pos2D.x, pos2D.y);
              first = false;
            } else {
              ctx.lineTo(pos2D.x, pos2D.y);
            }
          }
        });
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });
    });
  };

  // Draw hexagonal pattern like in the reference image
  const drawHexPattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const hexSize = 8;
    const spacing = 12;
    
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
    ctx.lineWidth = 0.5;
    
    for (let lat = -80; lat <= 80; lat += spacing) {
      for (let lng = -180; lng <= 180; lng += spacing) {
        const pos3D = latLngToVector3(lat, lng + rotationRef.current, 1);
        if (pos3D.z > 0.3) {
          const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, width, height);
          
          // Draw hexagon
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = pos2D.x + Math.cos(angle) * hexSize * pos3D.z;
            const y = pos2D.y + Math.sin(angle) * hexSize * pos3D.z;
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  };

  // Draw flow lines between points
  const drawFlowLines = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (locationData.length < 2) return;
    
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
    gradient.addColorStop(1, 'rgba(147, 51, 234, 0.4)');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    
    // Draw curved lines between major locations
    for (let i = 0; i < locationData.length - 1; i++) {
      const from = locationData[i];
      const to = locationData[i + 1];
      
      const pos1 = latLngToVector3(from.coordinates[1], from.coordinates[0] + rotationRef.current, 1);
      const pos2 = latLngToVector3(to.coordinates[1], to.coordinates[0] + rotationRef.current, 1);
      
      if (pos1.z > 0 && pos2.z > 0) {
        const proj1 = project3DTo2D(pos1.x, pos1.y, pos1.z, width, height);
        const proj2 = project3DTo2D(pos2.x, pos2.y, pos2.z, width, height);
        
        // Create curved path
        const midX = (proj1.x + proj2.x) / 2;
        const midY = (proj1.y + proj2.y) / 2 - 30;
        
        ctx.beginPath();
        ctx.moveTo(proj1.x, proj1.y);
        ctx.quadraticCurveTo(midX, midY, proj2.x, proj2.y);
        ctx.stroke();
        
        // Add animated dots along the path
        const t = (Date.now() * 0.001 + i) % 1;
        const dotX = proj1.x + (proj2.x - proj1.x) * t;
        const dotY = proj1.y + (proj2.y - proj1.y) * t - 30 * Math.sin(Math.PI * t);
        
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.fill();
      }
    }
  };

  // Handle click on points
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Check if click is near any location point
    locationData.forEach(location => {
      const pos3D = latLngToVector3(location.coordinates[1], location.coordinates[0] + rotationRef.current, 1);
      if (pos3D.z > 0) {
        const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, canvas.width, canvas.height);
        const distance = Math.sqrt((clickX - pos2D.x) ** 2 + (clickY - pos2D.y) ** 2);
        
        if (distance < 15) {
          setTooltip({
            x: clickX,
            y: clickY,
            country: location.country,
            candidatures: location.candidatures,
            matchPercentage: location.matchPercentage,
            visible: true
          });
        }
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Dark space background with gradient
      const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
      bgGradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      bgGradient.addColorStop(1, 'rgba(30, 41, 59, 0.8)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Globe sphere with glass effect
      const globeGradient = ctx.createRadialGradient(width/2 - 50, height/2 - 50, 0, width/2, height/2, 180);
      globeGradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
      globeGradient.addColorStop(0.7, 'rgba(29, 78, 216, 0.15)');
      globeGradient.addColorStop(1, 'rgba(15, 23, 42, 0.1)');
      
      ctx.beginPath();
      ctx.arc(width/2, height/2, 180, 0, Math.PI * 2);
      ctx.fillStyle = globeGradient;
      ctx.fill();
      
      // Globe border
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw hexagonal pattern
      drawHexPattern(ctx, width, height);

      // Draw world map
      drawWorldMap(ctx, width, height);

      // Draw flow lines
      drawFlowLines(ctx, width, height);

      // Draw latitude and longitude grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      
      // Longitude lines
      for (let lng = -180; lng <= 180; lng += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const pos3D = latLngToVector3(lat, lng + rotationRef.current, 1);
          const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, width, height);
          
          if (pos3D.z > 0) {
            if (lat === -90) {
              ctx.moveTo(pos2D.x, pos2D.y);
            } else {
              ctx.lineTo(pos2D.x, pos2D.y);
            }
          }
        }
        ctx.stroke();
      }

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lng = -180; lng <= 180; lng += 5) {
          const pos3D = latLngToVector3(lat, lng + rotationRef.current, 1);
          const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, width, height);
          
          if (pos3D.z > 0) {
            if (lng === -180) {
              ctx.moveTo(pos2D.x, pos2D.y);
            } else {
              ctx.lineTo(pos2D.x, pos2D.y);
            }
          }
        }
        ctx.stroke();
      }

      // Draw location points with enhanced style
      locationData.forEach((location) => {
        const pos3D = latLngToVector3(location.coordinates[1], location.coordinates[0] + rotationRef.current, 1);
        const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, width, height);
        
        if (pos3D.z > 0) {
          const pointSize = Math.max(4, Math.min(16, location.candidatures / 20));
          
          // Outer glow effect
          const glowGradient = ctx.createRadialGradient(pos2D.x, pos2D.y, 0, pos2D.x, pos2D.y, pointSize + 8);
          glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          glowGradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.4)');
          glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          
          ctx.beginPath();
          ctx.arc(pos2D.x, pos2D.y, pointSize + 8, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
          
          // Main point with gradient
          const pointGradient = ctx.createRadialGradient(pos2D.x - 2, pos2D.y - 2, 0, pos2D.x, pos2D.y, pointSize);
          pointGradient.addColorStop(0, '#60A5FA');
          pointGradient.addColorStop(1, '#3B82F6');
          
          ctx.beginPath();
          ctx.arc(pos2D.x, pos2D.y, pointSize, 0, Math.PI * 2);
          ctx.fillStyle = pointGradient;
          ctx.fill();
          
          // Border
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Pulsing animation
          const pulseRadius = pointSize + Math.sin(Date.now() * 0.005 + location.coordinates[0]) * 3;
          ctx.beginPath();
          ctx.arc(pos2D.x, pos2D.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Atmospheric glow
      const atmosphereGradient = ctx.createRadialGradient(width/2, height/2, 170, width/2, height/2, 190);
      atmosphereGradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
      atmosphereGradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
      
      ctx.beginPath();
      ctx.arc(width/2, height/2, 190, 0, Math.PI * 2);
      ctx.fillStyle = atmosphereGradient;
      ctx.fill();

      // Rotate the globe
      if (!isHovered) {
        rotationRef.current += 0.3;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [locationData, isHovered]);

  return (
    <div className="relative w-full h-96 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={450}
        height={450}
        className="cursor-pointer transition-transform hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCanvasClick}
      />
      
      {/* Tooltip */}
      {tooltip.visible && (
        <div 
          className="absolute z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 p-4 min-w-[200px] pointer-events-none"
          style={{ 
            left: tooltip.x + 10, 
            top: tooltip.y - 80,
            transform: tooltip.x > 300 ? 'translateX(-100%)' : 'none'
          }}
        >
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm">{tooltip.country}</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Candidatures:</span>
                <span className="font-medium text-blue-600">{tooltip.candidatures}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Match moyen:</span>
                <span className="font-medium text-green-600">{tooltip.matchPercentage}%</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
        </div>
      )}
      
      {/* Click anywhere to close tooltip */}
      {tooltip.visible && (
        <div 
          className="absolute inset-0 z-5"
          onClick={() => setTooltip(prev => ({ ...prev, visible: false }))}
        />
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 text-xs shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-gray-600">Origine des candidatures</span>
        </div>
        <div className="text-gray-500 text-xs">
          Cliquez sur un point pour plus d'infos
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 text-xs shadow-lg">
        <div className="text-gray-600 font-medium">Globe interactif</div>
        <div className="text-gray-500 text-xs">Survolez pour arrêter la rotation</div>
      </div>
    </div>
  );
};

export default InteractiveGlobe;
