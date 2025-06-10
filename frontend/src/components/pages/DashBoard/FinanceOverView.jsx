import React from 'react'
import CustomPieChart from './Chart/CustomPieChart'
const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];
function FinanceOverView({ totalExpense, totalIncome, totalBalance }) {

    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expense", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];
    console.log({ totalBalance, totalExpense, totalIncome });
    console.log("balanceData", balanceData);
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Financial OverView</h5>
            </div>
            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`₹${totalBalance}`}
                colors={COLORS}
                showTextAnchor={true}
            />
        </div>
    )
}

export default FinanceOverView
