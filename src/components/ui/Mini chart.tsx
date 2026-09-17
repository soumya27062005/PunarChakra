interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  showAxis?: boolean;
  labels?: string[];
}

export function MiniChart({
  data,
  color = '#059669',
  height = 60,
  width = 280,
  showAxis = false,
  labels,
}: MiniChartProps) {
  if (data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const padding = 4;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;

  const points = data.map((value, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((value - min) / range) * chartHeight;
    return { x, y, value };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height + (showAxis ? 20 : 0)}`}
        className="w-full"
        style={{ height: height + (showAxis ? 20 : 0) }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={color} />
        ))}
        {showAxis && labels && (
          <g>
            {labels.map((label, i) => {
              const x = padding + (i / (labels.length - 1)) * chartWidth;
              return (
                <text
                  key={i}
                  x={x}
                  y={height + 14}
                  textAnchor="middle"
                  className="text-[9px] fill-gray-400"
                  fontSize="9"
                >
                  {label}
                </text>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
