import { Brain, BarChart3, Users, FileText, MessageSquare, Calendar, Database } from "lucide-react";

interface VisualizationProps {
  layoutName: string;
  className?: string;
}

const sampleData = [
  { id: 1, title: 'Analytics Hub', subtitle: 'Data Intelligence', icon: BarChart3 },
  { id: 2, title: 'User Management', subtitle: 'Access Control', icon: Users },
  { id: 3, title: 'Content System', subtitle: 'Digital Assets', icon: FileText },
  { id: 4, title: 'Communications', subtitle: 'Messaging Hub', icon: MessageSquare },
  { id: 5, title: 'Scheduling', subtitle: 'Time Management', icon: Calendar },
  { id: 6, title: 'Data Storage', subtitle: 'Information Repository', icon: Database }
];

export function LayoutVisualization({ layoutName, className = "" }: VisualizationProps) {
  const baseClasses = `relative h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`;

  switch (layoutName) {
    case 'Neural Network':
      return (
        <div className={baseClasses}>
          <div className="absolute inset-0 p-8">
            {/* Neural nodes */}
            {sampleData.map((item, i) => {
              const angle = (i / sampleData.length) * 2 * Math.PI;
              const radius = 35;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;

              return (
                <div
                  key={item.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 border border-gray-200 dark:border-gray-700">
                    <item.icon className="w-8 h-8 text-[hsl(25,100%,50%)]" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Center node */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-110 transition-transform duration-300">
                <Brain className="w-10 h-10 text-[hsl(25,100%,50%)]" />
              </div>
            </div>
            
            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {sampleData.map((_, i) => {
                const angle = (i / sampleData.length) * 2 * Math.PI;
                const nextAngle = ((i + 1) / sampleData.length) * 2 * Math.PI;
                const radius = 35;
                const centerX = 50;
                const centerY = 50;
                
                const x1 = centerX + Math.cos(angle) * radius;
                const y1 = centerY + Math.sin(angle) * radius;
                const x2 = centerX + Math.cos(nextAngle) * radius;
                const y2 = centerY + Math.sin(nextAngle) * radius;
                
                return (
                  <g key={i}>
                    <line
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="hsl(25,100%,50%)"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${x1}%`}
                      y2={`${y1}%`}
                      stroke="hsl(25,100%,50%)"
                      strokeWidth="1"
                      opacity="0.2"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      );

    case 'Quantum Grid':
      return (
        <div className={baseClasses}>
          <div className="p-6 grid grid-cols-3 grid-rows-2 gap-4 h-full">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="bg-[hsl(25,100%,50%)]/20 rounded border border-[hsl(25,100%,50%)] animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      );

    case 'Bio Helix':
      return (
        <div className={baseClasses}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-48">
              {/* DNA Helix Structure */}
              <div className="absolute inset-0">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-[hsl(25,100%,50%)] rounded-full absolute animate-float"
                    style={{
                      left: i % 2 === 0 ? '20%' : '80%',
                      top: `${10 + i * 8}%`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}
              </div>
              
              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full">
                <path 
                  d="M 20 20 Q 50 30 80 40 T 20 60 Q 50 70 80 80" 
                  stroke="hsl(25,100%,50%)" 
                  strokeWidth="2" 
                  fill="none" 
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>
      );

    case 'Cosmic Web':
      return (
        <div className={baseClasses}>
          <div className="absolute inset-0 p-6">
            {/* Cosmic Nodes */}
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className={`absolute bg-[hsl(25,100%,50%)] rounded-full animate-pulse`}
                style={{
                  width: `${8 + (i % 3) * 4}px`,
                  height: `${8 + (i % 3) * 4}px`,
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
            
            {/* Web Connections */}
            <svg className="absolute inset-0 w-full h-full">
              <path 
                d="M 30 30 Q 100 50 200 80 T 300 150" 
                stroke="hsl(25,100%,50%)" 
                strokeWidth="1" 
                fill="none" 
                opacity="0.4"
              />
              <path 
                d="M 250 50 Q 150 100 80 180" 
                stroke="hsl(25,100%,50%)" 
                strokeWidth="1" 
                fill="none" 
                opacity="0.4"
              />
            </svg>
          </div>
        </div>
      );

    case 'Fluid Dynamics':
      return (
        <div className={baseClasses}>
          <div className="absolute inset-0 p-6">
            {/* Flow Patterns */}
            <div className="absolute inset-0">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="w-full h-1 bg-gradient-to-r from-transparent via-[hsl(25,100%,50%)] to-transparent opacity-60 absolute animate-pulse"
                  style={{
                    top: `${25 + i * 25}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
            
            {/* Flow Particles */}
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[hsl(25,100%,50%)] rounded-full animate-float"
                style={{
                  top: `${20 + i * 8}%`,
                  left: `${10 + i * 8}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>
      );

    case 'Fractal Geometry':
      return (
        <div className={baseClasses}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Nested Shapes */}
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-[hsl(25,100%,50%)] rotate-45 animate-spin"
                  style={{
                    width: `${64 - i * 12}px`,
                    height: `${64 - i * 12}px`,
                    animationDuration: `${8 - i * 2}s`,
                    animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case 'Crystal Lattice':
      return (
        <div className={baseClasses}>
          <div className="absolute inset-0 p-6">
            {/* Lattice Points */}
            <div className="grid grid-cols-5 grid-rows-4 gap-8 h-full">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-[hsl(25,100%,50%)] rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            
            {/* Crystal Bonds */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <pattern id="lattice" patternUnits="userSpaceOnUse" width="40" height="40">
                  <line x1="0" y1="0" x2="40" y2="0" stroke="hsl(25,100%,50%)" strokeWidth="1" opacity="0.3"/>
                  <line x1="0" y1="0" x2="0" y2="40" stroke="hsl(25,100%,50%)" strokeWidth="1" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#lattice)"/>
            </svg>
          </div>
        </div>
      );

    case 'Holographic Matrix':
      return (
        <div className={baseClasses}>
          <div className="absolute inset-0 p-6">
            {/* 3D Layers */}
            <div className="absolute inset-0">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="absolute glass-effect rounded-lg animate-float"
                  style={{
                    width: `${128 - i * 16}px`,
                    height: `${96 - i * 12}px`,
                    top: `${16 + i * 8}%`,
                    left: `${16 + i * 8}%`,
                    transform: `rotate(${12 - i * 6}deg)`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
            
            {/* Matrix Grid */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-1 opacity-30">
              {Array.from({ length: 48 }, (_, i) => (
                <div
                  key={i}
                  className="bg-[hsl(25,100%,50%)]/20 rounded-sm animate-pulse"
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={baseClasses}>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-2">🔬</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Layout Preview</div>
            </div>
          </div>
        </div>
      );
  }
}
