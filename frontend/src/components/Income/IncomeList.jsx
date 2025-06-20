import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionsInfoCard from '../pages/DashBoard/dashBoard/TransactionsInfoCard'
import moment from 'moment'

const IncomeList = ({ transactions, onDelete, onDownload }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Income Sourse</h5>

                <button className='card-btn' onClick={onDownload}>
                    <LuDownload className='text-base' />
                    <span className='ml-2'>Download</span>
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 font-bold text-black'>
                {transactions?.slice(0, 100)?.map((item) => (
                    <TransactionsInfoCard
                        key={item._id}
                        title={item.source}
                        icon={item.icon}
                        date={moment(item.date).format('DD-MM-YYYY')}
                        amount={item.amount}
                        type="income"
                        hideDelete-btn
                        onDelete={() => onDelete(item._id)}
                    />

                ))}
            </div>
        </div>
    )
}

export default IncomeList
