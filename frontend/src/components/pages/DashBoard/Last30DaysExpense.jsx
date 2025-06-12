import React from 'react'
import CustomeBarChart from './Chart/CustomeBarChart'
import { useState, useEffect } from 'react'
import { preparExpenseBarChartData } from '../../../utils/helper'

const Last30DaysExpense = ({ transactions }) => {
    const [ChartData, setChartData] = useState([]);

    useEffect(() => {
        const result = preparExpenseBarChartData(transactions || []);
        setChartData(result);
    }, [transactions]);

    return (
        <div className='card col-span-1'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg font-semibold'>Last30DaysExpense</h5>
            </div>
            <CustomeBarChart data={ChartData} />
        </div>
    )
}

export default Last30DaysExpense
