
import React, { useEffect, useRef, useState } from 'react';

interface LocationData {
  country: string;
  percentage: number;
  flag: string;
  coordinates: [number, number];
}

interface InteractiveGlobeProps {
  locationData: LocationData[];
}

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ locationData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isHovered, setIsHovered] = useState(false);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = 1;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient background
      const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
      bgGradient.addColorStop(0, 'rgba(240, 249, 255, 0.8)');
      bgGradient.addColorStop(1, 'rgba(219, 234, 254, 0.4)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw globe base with glass effect
      const globeGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, 180);
      globeGradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      globeGradient.addColorStop(0.7, 'rgba(147, 197, 253, 0.2)');
      globeGradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
      
      ctx.beginPath();
      ctx.arc(width/2, height/2, 180, 0, Math.PI * 2);
      ctx.fillStyle = globeGradient;
      ctx.fill();
      
      // Add subtle border
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw longitude lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;
      
      for (let lng = -180; lng <= 180; lng += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const pos3D = latLngToVector3(lat, lng + rotationRef.current, radius);
          const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, width, height);
          
          if (pos3D.z > 0) { // Only draw front-facing lines
            if (lat === -90) {
              ctx.moveTo(pos2D.x, pos2D.y);
            } else {
              ctx.lineTo(pos2D.x, pos2D.y);
            }
          }
        }
        ctx.stroke();
      }

      // Draw latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lng = -180; lng <= 180; lng += 5) {
          const pos3D = latLngToVector3(lat, lng + rotationRef.current, radius);
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

      // Draw connection lines between locations
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < locationData.length - 1; i++) {
        const current = locationData[i];
        const next = locationData[i + 1];
        
        const pos1 = latLngToVector3(current.coordinates[1], current.coordinates[0] + rotationRef.current, radius);
        const pos2 = latLngToVector3(next.coordinates[1], next.coordinates[0] + rotationRef.current, radius);
        
        const proj1 = project3DTo2D(pos1.x, pos1.y, pos1.z, width, height);
        const proj2 = project3DTo2D(pos2.x, pos2.y, pos2.z, width, height);
        
        if (pos1.z > 0 && pos2.z > 0) {
          ctx.beginPath();
          ctx.moveTo(proj1.x, proj1.y);
          ctx.lineTo(proj2.x, proj2.y);
          ctx.stroke();
        }
      }

      // Draw location points
      locationData.forEach((location) => {
        const pos3D = latLngToVector3(location.coordinates[1], location.coordinates[0] + rotationRef.current, radius);
        const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, width, height);
        
        // Only draw points on the front side of the globe
        if (pos3D.z > 0) {
          const pointSize = Math.max(3, Math.min(12, location.percentage / 3));
          
          // Outer glow
          const glowGradient = ctx.createRadialGradient(pos2D.x, pos2D.y, 0, pos2D.x, pos2D.y, pointSize + 4);
          glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          
          ctx.beginPath();
          ctx.arc(pos2D.x, pos2D.y, pointSize + 4, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
          
          // Main point
          ctx.beginPath();
          ctx.arc(pos2D.x, pos2D.y, pointSize, 0, Math.PI * 2);
          ctx.fillStyle = '#3B82F6';
          ctx.fill();
          
          // White center highlight
          ctx.beginPath();
          ctx.arc(pos2D.x - 1, pos2D.y - 1, pointSize / 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fill();
        }
      });

      // Add subtle highlight effect
      const highlightGradient = ctx.createRadialGradient(width/2 - 60, height/2 - 60, 0, width/2, height/2, 200);
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(width/2, height/2, 180, 0, Math.PI * 2);
      ctx.fillStyle = highlightGradient;
      ctx.fill();

      // Rotate the globe
      if (!isHovered) {
        rotationRef.current += 0.2;
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
    <div className="relative w-full h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="cursor-pointer transition-transform hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 text-xs shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600">Origine des candidatures</span>
        </div>
        <div className="text-gray-500 text-xs">
          Taille = volume de candidatures
        </div>
      </div>

      {/* Info overlay */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 text-xs shadow-lg">
        <div className="text-gray-600 font-medium">Globe interactif</div>
        <div className="text-gray-500 text-xs">Survolez pour arrêter la rotation</div>
      </div>
    </div>
  );
};

export default InteractiveGlobe;
