import React, { useState, useEffect } from 'react'
import { LuPlus } from "react-icons/lu"
import CustomBarChart from '../pages/DashBoard/Chart/CustomeBarChart'
import { preparIncomeBarChartData } from '../../utils/helper'

function IncomeOverview({ transactions, onAddIncome }) {
    const [ChartData, setChartData] = useState([])

    useEffect(() => {
        const result = preparIncomeBarChartData(transactions)
        setChartData(result)

        return () => { };

    }, [transactions])
    return (
            <div className='card'>
                <div className='flex items-center justify-between'>
                    <div className=''>
                        <h5 className='text-lg'>Income Overview</h5>
                        <p className='text-xs text-gray-400'>
                            Track Your Earnings Over Time And Analyze Your Income
                        </p>
                    </div>
                    <button className='add-btn' onClick={onAddIncome}>
                        <LuPlus className='' />
                        Add Income
                    </button>

                </div>
                <div className='mt-10'>
                    <CustomBarChart data={ChartData} />
                </div>
            </div>
    )
}

export default IncomeOverview
