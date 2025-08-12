import { useMemo } from 'react';

interface RadarChartProps {
  data: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  size?: number;
}

export function RadarChart({ data, size = 300 }: RadarChartProps) {
  const center = size / 2;
  const radius = (size / 2) - 40;
  
  const dimensions = [
    { key: 'will', label: 'Will', angle: 0 },
    { key: 'interest', label: 'Interest', angle: 60 },
    { key: 'skill', label: 'Skill', angle: 120 },
    { key: 'cognitive', label: 'Cognitive', angle: 180 },
    { key: 'ability', label: 'Ability', angle: 240 },
    { key: 'realWorld', label: 'Real World', angle: 300 }
  ];

  const points = useMemo(() => {
    return dimensions.map(dim => {
      const value = data[dim.key as keyof typeof data] / 100;
      const angleRad = (dim.angle * Math.PI) / 180;
      const x = center + (radius * value * Math.cos(angleRad - Math.PI / 2));
      const y = center + (radius * value * Math.sin(angleRad - Math.PI / 2));
      return { x, y, value: data[dim.key as keyof typeof data] };
    });
  }, [data, center, radius]);

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="drop-shadow-lg">
        {/* Background circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((ratio, index) => (
          <circle
            key={index}
            cx={center}
            cy={center}
            r={radius * ratio}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}
        
        {/* Axis lines */}
        {dimensions.map((dim, index) => {
          const angleRad = (dim.angle * Math.PI) / 180;
          const x2 = center + (radius * Math.cos(angleRad - Math.PI / 2));
          const y2 = center + (radius * Math.sin(angleRad - Math.PI / 2));
          
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.5}
            />
          );
        })}
        
        {/* Data area */}
        <path
          d={pathData}
          fill="hsl(var(--primary))"
          fillOpacity="0.2"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--background))"
            strokeWidth="2"
          />
        ))}
        
        {/* Labels */}
        {dimensions.map((dim, index) => {
          const angleRad = (dim.angle * Math.PI) / 180;
          const labelDistance = radius + 25;
          const x = center + (labelDistance * Math.cos(angleRad - Math.PI / 2));
          const y = center + (labelDistance * Math.sin(angleRad - Math.PI / 2));
          
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-medium fill-foreground"
            >
              {dim.label}
            </text>
          );
        })}
        
        {/* Score labels */}
        {points.map((point, index) => (
          <text
            key={index}
            x={point.x}
            y={point.y - 15}
            textAnchor="middle"
            className="text-xs font-bold fill-primary"
          >
            {point.value}
          </text>
        ))}
      </svg>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">WISCAR Framework Analysis</p>
        <p className="text-xs text-muted-foreground mt-1">
          Will • Interest • Skill • Cognitive • Ability • Real-world
        </p>
      </div>
    </div>
  );
}