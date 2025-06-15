import React from 'react'
import CustomPieChart from '../Chart/CustomPieChart'
import { useState, useEffect } from 'react'
const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

function RecentIncomeWithChart({ data, totalIncome }) {

    const [ChartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data.map((item) => ({
            name: item.source,
            amount: item.amount
        }));
        setChartData(dataArr);
    }
    useEffect(() => {
        console.log("Incoming data:", data); // 👈 Check what you're receiving
        prepareChartData();
    }, [data]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>
            <CustomPieChart
                data={ChartData}
                label={"Total Income"}
                totalAmount={`₹${totalIncome}`}
                colors={COLORS}
                showTextAnchor={true}
            />
        </div>
    )
}

export default RecentIncomeWithChart
