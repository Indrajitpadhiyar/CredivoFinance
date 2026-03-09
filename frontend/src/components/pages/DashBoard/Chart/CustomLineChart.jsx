import React from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';

const CustomLineChart = ({ data = [] }) => {
    const CustomToolTip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-4 border border-blue-100/50">
                    <p className="text-[10px] text-blue-500 font-bold mb-1 uppercase tracking-[0.1em]">
                        {payload[0].payload.month}
                    </p>
                    <p className="text-lg font-black text-slate-800">
                        ₹{payload[0].payload.amount.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Calculate dynamic width based on data points
    const dataCount = data.length;
    const minPointWidth = 70;
    const chartWidth = Math.max(800, dataCount * minPointWidth);

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm overflow-x-auto custom-scrollbar">
            <style>
                {`
                    @keyframes pulse-glow {
                        0% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); stroke-width: 4; }
                        50% { filter: drop-shadow(0 0 15px rgba(45, 212, 191, 0.8)); stroke-width: 5; }
                        100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); stroke-width: 4; }
                    }
                    .animate-pulse-glow {
                        animation: pulse-glow 3s infinite ease-in-out;
                    }
                `}
            </style>
            <div style={{ width: `${chartWidth}px`, minWidth: '100%' }}>
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 20 }}>
                        <defs>
                            <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="50%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#2dd4bf" />
                            </linearGradient>
                            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.05} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
                            dy={15}
                            interval={0}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
                        />
                        <Tooltip
                            content={<CustomToolTip />}
                            cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }}
                        />
                        <Area
                            type="linear"
                            dataKey="amount"
                            stroke="url(#lineStroke)"
                            strokeWidth={4}
                            fill="url(#areaFill)"
                            className="animate-pulse-glow"
                            animationDuration={2500}
                            animationEasing="ease-in-out"
                            dot={{ r: 5, fill: '#fff', strokeWidth: 3, stroke: '#3b82f6' }}
                            activeDot={{ r: 8, fill: '#fff', strokeWidth: 3, stroke: '#2dd4bf', shadow: '0 0 10px rgba(45, 212, 191, 0.5)' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CustomLineChart;
