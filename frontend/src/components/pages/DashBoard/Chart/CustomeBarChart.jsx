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

const CustomeBarChart = ({ data }) => {

    //function to alternate colors
    const getBarColor = (index) => {
        return index % 2 === 0 ? '#875cf5' : '#cfbefb'
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length > 0) {
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs text-gray-600 font-semibold mb-1'>{payload[0].payload.category}</p>
                    <p className='text-xs text-gray-600'>Amount:
                        <span className='text-xs font-medium text-gray-900'>
                            ₹{payload[0].payload.amount}
                        </span>
                    </p>
                </div>
            )
        }

        return null
    }

    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke='name' />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }} stroke='none' />
                    <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke='none' />
                    <Tooltip content={CustomTooltip} />
                    <Bar
                        dataKey="amount"
                        fill='#FF8042'
                        radius={[10, 10, 0, 0]}
                        activeDot={{ r: 8, fill: 'Yellow' }}
                        activeStyle={{ fill: 'Yellow' }}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomeBarChart
