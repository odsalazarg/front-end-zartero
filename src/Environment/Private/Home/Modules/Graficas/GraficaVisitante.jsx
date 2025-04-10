import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const EnhancedLineChart = ({ title = "Data Visualization", data }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <h2 className="text-lg font-semibold mb-4" style={{fontSize:'20px'}}>{title}</h2>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              label={{ 
                value: '', 
                position: 'bottom',
                offset: -5
              }}
            />
            <YAxis
              label={{
                value: '',
                angle: -90,
                position: 'insideLeft',
                offset: -5
              }}
              tickFormatter={(value) => Math.round(value)} // Formatear a números enteros
              allowDecimals={false} // Evitar decimales en los ticks
            />
            <Tooltip formatter={(value) => [Math.round(value), "Cantidad"]} /> {/* Formatear valores en el tooltip */}
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Cantidad"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{
                fill: '#2563eb',
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                stroke: '#2563eb',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnhancedLineChart;