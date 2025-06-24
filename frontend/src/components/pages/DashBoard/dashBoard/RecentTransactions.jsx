import React from 'react'
import { LuArrowBigRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionsInfoCard from './TransactionsInfoCard'

const RecentTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Recent Transactions</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowBigRight className='text-base' />
                </button>
            </div>

            <div className='mt-6 overflow-hidden overflow-y-scroll'>
                {transactions?.slice(0, 5).map((item) => (
                    <TransactionsInfoCard
                        key={item._id}
                        title={item.type == 'expense' ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDelete-btn
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentTransactions
