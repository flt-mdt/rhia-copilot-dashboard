
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
  const [tooltip, setTooltip] = useState<TooltipData>({ x: 0, y: 0, country: '', candidatures: 0, matchPercentage: 0, visible: false });
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

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
    const scale = 170;
    
    return {
      x: centerX + x * scale,
      y: centerY - y * scale,
      z: z
    };
  };

  // Detailed world coastlines and country borders
  const drawDetailedWorldMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // More detailed continent and country outlines
    const worldPaths = [
      // North America - USA detailed
      {
        name: 'USA_East',
        paths: [
          [[-67, 45], [-70, 41], [-74, 40], [-76, 39], [-77, 37], [-81, 32], [-81, 25], [-84, 30], [-88, 30], [-94, 29], [-97, 26], [-93, 29], [-90, 32], [-85, 35], [-80, 37], [-75, 40], [-70, 42], [-67, 45]]
        ]
      },
      {
        name: 'USA_West',
        paths: [
          [[-125, 49], [-125, 32], [-117, 32], [-114, 35], [-111, 37], [-109, 41], [-111, 45], [-115, 47], [-120, 49], [-125, 49]]
        ]
      },
      {
        name: 'Canada',
        paths: [
          [[-141, 69], [-141, 60], [-130, 54], [-125, 49], [-110, 49], [-95, 49], [-85, 46], [-75, 45], [-65, 47], [-60, 50], [-65, 60], [-75, 68], [-95, 69], [-120, 69], [-141, 69]]
        ]
      },
      
      // Europe detailed
      {
        name: 'UK',
        paths: [
          [[-8, 60], [-2, 60], [2, 57], [2, 50], [-6, 50], [-8, 54], [-8, 60]]
        ]
      },
      {
        name: 'France',
        paths: [
          [[-5, 51], [8, 51], [8, 42], [3, 42], [-2, 43], [-5, 48], [-5, 51]]
        ]
      },
      {
        name: 'Germany',
        paths: [
          [[6, 55], [15, 55], [15, 47], [10, 47], [6, 50], [6, 55]]
        ]
      },
      {
        name: 'Scandinavia',
        paths: [
          [[5, 71], [31, 71], [31, 55], [15, 55], [10, 58], [5, 60], [5, 71]]
        ]
      },
      {
        name: 'Spain_Portugal',
        paths: [
          [[-10, 44], [3, 44], [3, 36], [-9, 36], [-10, 44]]
        ]
      },
      {
        name: 'Italy',
        paths: [
          [[7, 47], [18, 47], [18, 37], [12, 36], [8, 39], [7, 47]]
        ]
      },
      
      // Asia detailed
      {
        name: 'Russia',
        paths: [
          [[20, 78], [180, 78], [180, 50], [130, 42], [100, 45], [60, 50], [40, 55], [30, 60], [20, 65], [20, 78]]
        ]
      },
      {
        name: 'China',
        paths: [
          [[73, 54], [135, 54], [135, 18], [100, 18], [90, 28], [80, 35], [73, 40], [73, 54]]
        ]
      },
      {
        name: 'India',
        paths: [
          [[68, 37], [97, 37], [97, 8], [77, 8], [68, 20], [68, 37]]
        ]
      },
      {
        name: 'Japan',
        paths: [
          [[129, 46], [146, 46], [146, 30], [129, 30], [129, 46]]
        ]
      },
      
      // Africa detailed
      {
        name: 'North_Africa',
        paths: [
          [[-17, 35], [37, 35], [37, 15], [15, 4], [-17, 15], [-17, 35]]
        ]
      },
      {
        name: 'West_Africa',
        paths: [
          [[-17, 15], [15, 4], [15, -5], [-10, -5], [-17, 10], [-17, 15]]
        ]
      },
      {
        name: 'East_Africa',
        paths: [
          [[15, 15], [52, 15], [52, -12], [30, -12], [15, 0], [15, 15]]
        ]
      },
      {
        name: 'South_Africa',
        paths: [
          [[15, -12], [33, -12], [33, -35], [16, -35], [15, -25], [15, -12]]
        ]
      },
      
      // South America detailed
      {
        name: 'Brazil',
        paths: [
          [[-74, 5], [-35, 5], [-35, -33], [-58, -33], [-68, -20], [-74, -10], [-74, 5]]
        ]
      },
      {
        name: 'Argentina',
        paths: [
          [[-74, -20], [-54, -20], [-54, -55], [-67, -55], [-74, -35], [-74, -20]]
        ]
      },
      
      // Australia and Oceania
      {
        name: 'Australia',
        paths: [
          [[113, -10], [154, -10], [154, -44], [113, -44], [113, -10]]
        ]
      },
      {
        name: 'New_Zealand',
        paths: [
          [[166, -34], [179, -34], [179, -47], [166, -47], [166, -34]]
        ]
      }
    ];

    // Draw land masses with subtle green tint like in the reference
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(34, 197, 94, 0.08)';

    worldPaths.forEach(region => {
      region.paths.forEach(path => {
        ctx.beginPath();
        let first = true;
        let visiblePoints = 0;
        
        // Check if the path has visible points on this side of the globe
        path.forEach(([lng, lat]) => {
          const pos3D = latLngToVector3(lat, lng + rotationRef.current, 1);
          if (pos3D.z > 0) visiblePoints++;
        });
        
        if (visiblePoints > 2) {
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
        }
      });
    });
  };

  // Enhanced hexagonal pattern matching the reference
  const drawEnhancedHexPattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const hexSize = 6;
    const spacing = 12;
    const centerX = width / 2;
    const centerY = height / 2;
    const globeRadius = 170;
    
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
    ctx.lineWidth = 0.8;
    ctx.fillStyle = 'rgba(59, 130, 246, 0.03)';
    
    for (let lat = -85; lat <= 85; lat += spacing) {
      for (let lng = -180; lng <= 180; lng += spacing) {
        const pos3D = latLngToVector3(lat, lng + rotationRef.current, 1);
        if (pos3D.z > 0.2) {
          const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, width, height);
          
          // Check if hexagon is within globe bounds
          const distFromCenter = Math.sqrt((pos2D.x - centerX) ** 2 + (pos2D.y - centerY) ** 2);
          if (distFromCenter < globeRadius - 10) {
            const adjustedHexSize = hexSize * pos3D.z * 0.8;
            
            // Draw filled hexagon first
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3;
              const x = pos2D.x + Math.cos(angle) * adjustedHexSize;
              const y = pos2D.y + Math.sin(angle) * adjustedHexSize;
              
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.closePath();
            ctx.fill();
            
            // Draw hexagon border
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3;
              const x = pos2D.x + Math.cos(angle) * adjustedHexSize;
              const y = pos2D.y + Math.sin(angle) * adjustedHexSize;
              
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
    }
  };

  // Enhanced flow lines like in the reference
  const drawEnhancedFlowLines = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (locationData.length < 2) return;
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw curved flow lines between major points
    for (let i = 0; i < locationData.length; i++) {
      for (let j = i + 1; j < Math.min(i + 3, locationData.length); j++) {
        const from = locationData[i];
        const to = locationData[j];
        
        const pos1 = latLngToVector3(from.coordinates[1], from.coordinates[0] + rotationRef.current, 1);
        const pos2 = latLngToVector3(to.coordinates[1], to.coordinates[0] + rotationRef.current, 1);
        
        if (pos1.z > 0 && pos2.z > 0) {
          const proj1 = project3DTo2D(pos1.x, pos1.y, pos1.z, width, height);
          const proj2 = project3DTo2D(pos2.x, pos2.y, pos2.z, width, height);
          
          // Create multiple curved paths for better visual effect
          const numLines = 3;
          for (let lineIndex = 0; lineIndex < numLines; lineIndex++) {
            const offset = (lineIndex - 1) * 8;
            const alpha = 0.1 + (lineIndex * 0.05);
            
            const gradient = ctx.createLinearGradient(proj1.x, proj1.y, proj2.x, proj2.y);
            gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
            gradient.addColorStop(0.5, `rgba(147, 51, 234, ${alpha * 1.5})`);
            gradient.addColorStop(1, `rgba(59, 130, 246, ${alpha})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5 - (lineIndex * 0.3);
            
            // Create curved path with elevation
            const midX = (proj1.x + proj2.x) / 2 + offset;
            const midY = (proj1.y + proj2.y) / 2 - 40 - offset;
            
            ctx.beginPath();
            ctx.moveTo(proj1.x, proj1.y);
            ctx.quadraticCurveTo(midX, midY, proj2.x, proj2.y);
            ctx.stroke();
          }
          
          // Animated particles along the path
          const t = (Date.now() * 0.0008 + i * 0.3) % 1;
          const particleX = proj1.x + (proj2.x - proj1.x) * t;
          const particleY = proj1.y + (proj2.y - proj1.y) * t - 40 * Math.sin(Math.PI * t);
          
          // Particle glow
          const particleGradient = ctx.createRadialGradient(particleX, particleY, 0, particleX, particleY, 8);
          particleGradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          particleGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          
          ctx.beginPath();
          ctx.arc(particleX, particleY, 8, 0, Math.PI * 2);
          ctx.fillStyle = particleGradient;
          ctx.fill();
          
          // Particle core
          ctx.beginPath();
          ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();
        }
      }
    }
  };

  // Mouse event handlers
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastMousePosRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    if (isDraggingRef.current) {
      const deltaX = currentX - lastMousePosRef.current.x;
      rotationRef.current += deltaX * 0.5; // Smooth rotation
      
      lastMousePosRef.current = { x: currentX, y: currentY };
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  // Handle click on points
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current) return; // Don't show tooltip if dragging
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Check if click is near any location point
    let foundLocation = false;
    locationData.forEach(location => {
      const pos3D = latLngToVector3(location.coordinates[1], location.coordinates[0] + rotationRef.current, 1);
      if (pos3D.z > 0) {
        const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, canvas.width, canvas.height);
        const distance = Math.sqrt((clickX - pos2D.x) ** 2 + (clickY - pos2D.y) ** 2);
        
        if (distance < 20) {
          setTooltip({
            x: clickX,
            y: clickY,
            country: location.country,
            candidatures: location.candidatures,
            matchPercentage: location.matchPercentage,
            visible: true
          });
          foundLocation = true;
        }
      }
    });

    if (!foundLocation) {
      setTooltip(prev => ({ ...prev, visible: false }));
    }
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
      
      // Dark space background with subtle gradient
      const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
      bgGradient.addColorStop(0, 'rgba(15, 23, 42, 0.98)');
      bgGradient.addColorStop(0.7, 'rgba(30, 41, 59, 0.95)');
      bgGradient.addColorStop(1, 'rgba(51, 65, 85, 0.9)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Globe base with enhanced glass effect
      const globeGradient = ctx.createRadialGradient(width/2 - 60, height/2 - 60, 0, width/2, height/2, 180);
      globeGradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
      globeGradient.addColorStop(0.3, 'rgba(29, 78, 216, 0.08)');
      globeGradient.addColorStop(0.7, 'rgba(15, 23, 42, 0.05)');
      globeGradient.addColorStop(1, 'rgba(15, 23, 42, 0.2)');
      
      ctx.beginPath();
      ctx.arc(width/2, height/2, 170, 0, Math.PI * 2);
      ctx.fillStyle = globeGradient;
      ctx.fill();

      // Enhanced hexagonal pattern
      drawEnhancedHexPattern(ctx, width, height);

      // Detailed world map
      drawDetailedWorldMap(ctx, width, height);

      // Enhanced flow lines
      drawEnhancedFlowLines(ctx, width, height);

      // Geographic grid lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
      ctx.lineWidth = 0.8;
      
      // Longitude lines
      for (let lng = -180; lng <= 180; lng += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 3) {
          const pos3D = latLngToVector3(lat, lng + rotationRef.current, 1);
          if (pos3D.z > 0) {
            const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, width, height);
            
            if (first) {
              ctx.moveTo(pos2D.x, pos2D.y);
              first = false;
            } else {
              ctx.lineTo(pos2D.x, pos2D.y);
            }
          } else if (!first) {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 3) {
          const pos3D = latLngToVector3(lat, lng + rotationRef.current, 1);
          if (pos3D.z > 0) {
            const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, width, height);
            
            if (first) {
              ctx.moveTo(pos2D.x, pos2D.y);
              first = false;
            } else {
              ctx.lineTo(pos2D.x, pos2D.y);
            }
          } else if (!first) {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Enhanced location points
      locationData.forEach((location, index) => {
        const pos3D = latLngToVector3(location.coordinates[1], location.coordinates[0] + rotationRef.current, 1);
        const pos2D = project3DTo2D(pos3D.x, pos3D.y, pos3D.z, width, height);
        
        if (pos3D.z > 0) {
          const pointSize = Math.max(6, Math.min(12, location.candidatures / 25));
          const intensity = Math.min(1, location.candidatures / 100);
          
          // Multiple glow layers for enhanced effect
          for (let i = 3; i >= 0; i--) {
            const glowSize = pointSize + (i * 4);
            const alpha = (0.3 - i * 0.06) * intensity;
            
            const glowGradient = ctx.createRadialGradient(pos2D.x, pos2D.y, 0, pos2D.x, pos2D.y, glowSize);
            glowGradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
            glowGradient.addColorStop(0.7, `rgba(147, 51, 234, ${alpha * 0.6})`);
            glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
            
            ctx.beginPath();
            ctx.arc(pos2D.x, pos2D.y, glowSize, 0, Math.PI * 2);
            ctx.fillStyle = glowGradient;
            ctx.fill();
          }
          
          // Main point with enhanced gradient
          const pointGradient = ctx.createRadialGradient(pos2D.x - 2, pos2D.y - 2, 0, pos2D.x, pos2D.y, pointSize);
          pointGradient.addColorStop(0, '#FFFFFF');
          pointGradient.addColorStop(0.3, '#60A5FA');
          pointGradient.addColorStop(1, '#3B82F6');
          
          ctx.beginPath();
          ctx.arc(pos2D.x, pos2D.y, pointSize, 0, Math.PI * 2);
          ctx.fillStyle = pointGradient;
          ctx.fill();
          
          // Enhanced border
          ctx.beginPath();
          ctx.arc(pos2D.x, pos2D.y, pointSize, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          
          // Pulsing ring animation
          const time = Date.now() * 0.003;
          const pulseRadius = pointSize + 3 + Math.sin(time + index) * 2;
          const pulseAlpha = 0.4 + Math.sin(time + index) * 0.2;
          
          ctx.beginPath();
          ctx.arc(pos2D.x, pos2D.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(59, 130, 246, ${pulseAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Globe border with enhanced glow
      const borderGradient = ctx.createRadialGradient(width/2, height/2, 168, width/2, height/2, 172);
      borderGradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
      borderGradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)');
      
      ctx.beginPath();
      ctx.arc(width/2, height/2, 170, 0, Math.PI * 2);
      ctx.strokeStyle = borderGradient;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Atmospheric glow effect
      const atmosphereGradient = ctx.createRadialGradient(width/2, height/2, 170, width/2, height/2, 190);
      atmosphereGradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
      atmosphereGradient.addColorStop(0.8, 'rgba(59, 130, 246, 0.1)');
      atmosphereGradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
      
      ctx.beginPath();
      ctx.arc(width/2, height/2, 190, 0, Math.PI * 2);
      ctx.fillStyle = atmosphereGradient;
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [locationData]);

  return (
    <div className="relative w-full h-96 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={450}
        height={450}
        className="cursor-grab active:cursor-grabbing transition-transform"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleCanvasClick}
      />
      
      {/* Enhanced Tooltip */}
      {tooltip.visible && (
        <div 
          className="absolute z-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 p-4 min-w-[220px] pointer-events-none"
          style={{ 
            left: tooltip.x + 15, 
            top: tooltip.y - 90,
            transform: tooltip.x > 300 ? 'translateX(-100%) translateX(-30px)' : 'none'
          }}
        >
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-2">{tooltip.country}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Candidatures:</span>
                <span className="font-bold text-blue-600 text-lg">{tooltip.candidatures}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Match moyen:</span>
                <span className="font-bold text-green-600 text-lg">{tooltip.matchPercentage}%</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
        </div>
      )}
      
      {/* Click anywhere to close tooltip */}
      {tooltip.visible && (
        <div 
          className="absolute inset-0 z-5"
          onClick={() => setTooltip(prev => ({ ...prev, visible: false }))}
        />
      )}
      
      {/* Enhanced Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-xl px-4 py-3 text-sm shadow-xl border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
          <span className="text-gray-700 font-medium">Origine des candidatures</span>
        </div>
        <div className="text-gray-500 text-xs">
          Cliquez sur un point pour plus d'infos
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-xl px-4 py-3 text-sm shadow-xl border border-gray-200">
        <div className="text-gray-700 font-semibold mb-1">Globe interactif</div>
        <div className="text-gray-500 text-xs">Cliquez et glissez pour faire tourner</div>
      </div>
    </div>
  );
};

export default InteractiveGlobe;
