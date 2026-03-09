import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts'

const CustomeBarChart = ({ data = [] }) => {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length > 0) {
            return (
                <div className='bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-4 border border-emerald-100/50'>
                    <p className='text-[10px] text-emerald-600 font-bold mb-1 uppercase tracking-widest'>
                        {payload[0].payload.month || "Income"}
                    </p>
                    <p className='text-lg font-black text-slate-800'>
                        ₹{payload[0].payload.amount.toLocaleString()}
                    </p>
                </div>
            )
        }

        return null
    }

    return (
        <div className='bg-white mt-6 rounded-3xl p-4'>
            <style>
                {`
                    @keyframes bar-pulse {
                        0% { transform: scaleY(1); opacity: 1; }
                        50% { transform: scaleY(1.02); opacity: 0.9; }
                        100% { transform: scaleY(1); opacity: 1; }
                    }
                    .bar-animated:hover {
                        animation: bar-pulse 0.6s ease-in-out infinite;
                        filter: brightness(1.1) drop-shadow(0 0 8px rgba(16, 185, 129, 0.4));
                    }
                `}
            </style>
            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="incomeBarGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                        <linearGradient id="incomeBarGradientAlt" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#059669" />
                            <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                        dy={12}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: '#f8fafc', radius: 10 }}
                    />
                    <Bar
                        dataKey="amount"
                        fill="url(#incomeBarGradient)"
                        radius={[12, 12, 12, 12]}
                        barSize={32}
                        animationDuration={2000}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index % 2 === 0 ? "url(#incomeBarGradient)" : "url(#incomeBarGradientAlt)"}
                                className="bar-animated cursor-pointer transition-all duration-300"
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomeBarChart
