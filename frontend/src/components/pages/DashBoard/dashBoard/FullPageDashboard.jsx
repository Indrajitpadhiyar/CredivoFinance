import React from 'react'
import { useUserAuth } from '../../../Hooks/UseUSerAuth'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axiosInstance from '../../../../utils/axiosinstance'
import { API_PATHS } from '../../../../utils/apiPath'
import InfoCard from '../../../Card/InfoCard'
import { IoMdCard } from 'react-icons/io';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { addThousandSeparators } from '../../../../utils/helper'
import RecentTransactions from './RecentTransactions'
import FinanceOverView from './FinanceOverView'
import ExpenseTransactions from './ExpenseTransactions'
import Last30DaysExpense from './last30DaysExpense'
import Navbar from '../../../Navbar/Navbar'
import RecentIncomeWithChart from './RecentIncomeWithChart'
import RecentIncome from './RecentIncome'


function FullPageDashboard() {

    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null)
    const [Loading, setLoading] = useState(false)

    const fetchDashboardData = async () => {

        if (Loading) return;

        setLoading(true)

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.DASHBOARD.GET_DATA}`
            );

            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log("something went wrong please try again", error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchDashboardData();

        return () => {

        }
    }, [])

    return (
        <>
            <Navbar />
            <div className='flex flex-col w-full overflow-y-scroll'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <InfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        value={addThousandSeparators(dashboardData?.totalBalance || 0)}
                        color="bg-blue-500"
                    />
                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        value={addThousandSeparators(dashboardData?.totalIncome || 0)}
                        color="bg-orange-500"
                    />
                    <InfoCard
                        icon={<LuHandCoins />}
                        label="Total Expense"
                        value={addThousandSeparators(dashboardData?.totalExpense || 0)}
                        color="bg-red-500"
                    />
                </div>

                <div className='grid ml-2 h-[80%] grid-cols-1 md:grid-cols-2 p-5 gap-2 '>
                    <RecentTransactions
                        transactions={dashboardData?.recentTransactions}
                        onSeeMore={() => navigate("/Expense")}
                    />

                    <FinanceOverView
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                    />

                    <ExpenseTransactions
                        transactions={dashboardData?.last30DaysExpense?.transactions || []}
                        onSeeMore={() => navigate("/Expense")}
                    />

                    <Last30DaysExpense
                        transactions={dashboardData?.last30DaysExpense?.transactions || []}
                    />

                    <RecentIncomeWithChart
                        data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
                        totalIncome={dashboardData?.totalIncome || 0}
                    />

                    <RecentIncome
                        transactions={dashboardData?.last60DaysIncome?.transactions || []}
                        onSeeMore={() => navigate("/income")}
                    />

                </div>
            </div>
        </>
    )
}

export default FullPageDashboard
