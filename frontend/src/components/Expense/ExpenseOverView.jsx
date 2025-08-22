import React from 'react'
import { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { preparExpenseLinrChartData } from '../../../utils/helper'
import CustomLineChart from '../pages/DashBoard/Chart/CustomLineChart'

const ExpenseOverView = ({ transactions, onExpenseIncome }) => {
    const [ChartData, setChartData] = useState([])

    useEffect(() => {
        const result = preparExpenseLinrChartData(transactions);
        setChartData(result);

        return () => { };
    }, [transactions])
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className='text-lg'>Expense Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>
                        Track your spending trends over time and gain insights into where your money goes.
                    </p>
                </div>
                <button
                    className='add-btn' onClick={onExpenseIncome}>
                    <LuPlus className='text-lg'/>
                    Add Expense
                </button>
            </div>
            <div className='mt-10'>
                <CustomLineChart data={ChartData} />
            </div>
        </div>
    )
}

export default ExpenseOverView
