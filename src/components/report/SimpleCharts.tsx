// Proste komponenty wykresów bez Recharts - renderują się lepiej w PDF
interface PieChartData {
  name: string;
  value: number;
  color: string;
}

export const SimplePieChart = ({ data, size = 200 }: { data: PieChartData[]; size?: number }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90; // Start from top

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 20}
        fill="none"
        stroke="#27272a"
        strokeWidth="40"
      />
      {data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const angle = (percentage / 100) * 360;
        const endAngle = currentAngle + angle;
        
        // Calculate arc path
        const startX = size / 2 + (size / 2 - 20) * Math.cos((currentAngle * Math.PI) / 180);
        const startY = size / 2 + (size / 2 - 20) * Math.sin((currentAngle * Math.PI) / 180);
        const endX = size / 2 + (size / 2 - 20) * Math.cos((endAngle * Math.PI) / 180);
        const endY = size / 2 + (size / 2 - 20) * Math.sin((endAngle * Math.PI) / 180);
        
        const largeArcFlag = angle > 180 ? 1 : 0;
        
        const pathData = [
          `M ${size / 2} ${size / 2}`,
          `L ${startX} ${startY}`,
          `A ${size / 2 - 20} ${size / 2 - 20} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          'Z'
        ].join(' ');
        
        currentAngle = endAngle;
        
        return (
          <path
            key={index}
            d={pathData}
            fill={item.color}
            opacity="0.9"
          />
        );
      })}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 60}
        fill="#000000"
      />
    </svg>
  );
};

interface BarChartData {
  label: string;
  value: number;
}

export const SimpleBarChart = ({ 
  data, 
  width = 400, 
  height = 200,
  color = "#ec4899"
}: { 
  data: BarChartData[]; 
  width?: number; 
  height?: number;
  color?: string;
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = (width - 60) / data.length - 10;
  const chartHeight = height - 40;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Y axis */}
      <line x1="40" y1="10" x2="40" y2={height - 30} stroke="#3f3f46" strokeWidth="1" />
      {/* X axis */}
      <line x1="40" y1={height - 30} x2={width - 20} y2={height - 30} stroke="#3f3f46" strokeWidth="1" />
      
      {data.map((item, index) => {
        const barHeight = (item.value / maxValue) * chartHeight;
        const x = 50 + index * (barWidth + 10);
        const y = height - 30 - barHeight;
        
        return (
          <g key={index}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              rx="4"
            />
            <text
              x={x + barWidth / 2}
              y={height - 15}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="10"
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

interface LineChartData {
  label: string;
  value1: number;
  value2: number;
}

export const SimpleLineChart = ({
  data,
  width = 400,
  height = 200,
  color1 = "#ec4899",
  color2 = "#3b82f6"
}: {
  data: LineChartData[];
  width?: number;
  height?: number;
  color1?: string;
  color2?: string;
}) => {
  const maxValue = Math.max(
    ...data.map(d => Math.max(d.value1, d.value2))
  );
  const chartHeight = height - 40;
  const stepX = (width - 60) / (data.length - 1);

  const getY = (value: number) => {
    return height - 30 - (value / maxValue) * chartHeight;
  };

  const path1 = data
    .map((item, index) => {
      const x = 40 + index * stepX;
      const y = getY(item.value1);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  const path2 = data
    .map((item, index) => {
      const x = 40 + index * stepX;
      const y = getY(item.value2);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Y axis */}
      <line x1="40" y1="10" x2="40" y2={height - 30} stroke="#3f3f46" strokeWidth="1" />
      {/* X axis */}
      <line x1="40" y1={height - 30} x2={width - 20} y2={height - 30} stroke="#3f3f46" strokeWidth="1" />

      {/* Line 1 */}
      <path
        d={path1}
        fill="none"
        stroke={color1}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Line 2 */}
      <path
        d={path2}
        fill="none"
        stroke={color2}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Points */}
      {data.map((item, index) => {
        const x = 40 + index * stepX;
        return (
          <g key={index}>
            <circle cx={x} cy={getY(item.value1)} r="4" fill={color1} />
            <circle cx={x} cy={getY(item.value2)} r="4" fill={color2} />
            <text
              x={x}
              y={height - 15}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="10"
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
