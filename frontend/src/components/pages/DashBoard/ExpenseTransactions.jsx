import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionsInfoCard from './transactionsInfoCard'


function ExpenseTransactions({ transactions, onSeeMore }) {
    console.log("Transactions: ", transactions);
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Expanses</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    See All
                    <LuArrowRight className='text-base' />
                </button>
            </div>
            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map((expense) => (
                    <TransactionsInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MM YYYY")}
                        amount={expense.amount}
                        type={expense.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseTransactions
