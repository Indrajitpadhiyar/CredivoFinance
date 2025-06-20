import React from 'react'
import TransactionsInfoCard from '../pages/DashBoard/dashBoard/TransactionsInfoCard'
import moment from 'moment'
import { LuDownload } from 'react-icons/lu'

function ExpenseList({ transactions, onDelete, onDownload }) {
    return (
        <div className='card '>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>All Expanses</h5>

                <button className='card-btn' onClick={onDownload}>
                    <LuDownload className='text-base' />
                    <span
                        className='ml-2'
                    >
                        Download
                    </span>
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                {transactions?.slice(0, 100)?.map((expense) => (
                    <TransactionsInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format('DD-MM-YYYY')}
                        amount={expense.amount}
                        type="expense"
                        hideDeleteBtn={false}  
                        onDelete={() => onDelete(expense._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseList
