import React from 'react';

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length > 0) {
        const data = payload[0];
        return (
            <div className="bg-white p-2 shadow-md rounded-lg border border-gray-300">
                <p className="text-sm font-semibold text-purple-800 mb-1">
                    {payload[0].name}
                </p>
                <p className="text-xs text-gray-600">
                    Amount:
                    <span className="text-xs font-medium text-gray-900">
                        ₹{payload[0].value}
                    </span>
                </p>
            </div>
        );
    }

    return null;
}

export default CustomTooltip;
