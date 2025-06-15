import React from 'react'
import { LuArrowBigRight } from 'react-icons/lu'
import TransactionsInfoCard from './TransactionsInfoCard'
import moment from 'moment'

function RecentIncome({ transactions, onSeeMore }) {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Income</h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All
                    <LuArrowBigRight className='text-base' />
                </button>
            </div>
            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionsInfoCard
                        key={item._id}
                        title={item.source}
                        icon={item.icon}
                        date={item.date}
                        amount={item.amount}
                        type="income"
                        hideDelete-btn
                    />

                ))}
            </div>
        </div>
    )
}

export default RecentIncome
