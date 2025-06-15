import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

function CustomPieChart({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) {
  // Debug logs (optional)
  console.log("data:", data);
  console.log("colors:", colors);

  return (
    <div>
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          {showTextAnchor && (
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-base font-semibold"
            >
              {label}
              <tspan x="50%" dy="1.5em">{totalAmount}</tspan>
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomPieChart;
