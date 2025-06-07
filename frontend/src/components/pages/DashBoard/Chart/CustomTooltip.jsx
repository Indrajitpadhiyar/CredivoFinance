import React from 'react'

function CustomTooltip({ active, payload, label }) {

    if (active && payload && payload.length) {
        return (
            <div className='bg-white p-2 shadow-md rounded-lg border border-gray-300'>
                <p className='text-sm font-samibold text-purple-800 nb-1'>
                    {payload[0].name}
                </p>
                <p className='text-xs text-gray-600'>
                    Amount:
                    <span className='text-xs font-medium text-gray-900'>
                        {payload[0].value}
                    </span>
                </p>
            </div>
        );
    }

    return null
}

export default CustomTooltip
