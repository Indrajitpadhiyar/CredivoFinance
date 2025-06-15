import React from 'react'
import { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup'

function AddIncomeForm({ onAddIncome }) {

    const [Income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    })

    const handleChange = (key, value) => setIncome({ ...Income, [key]: value });
    return (
        <div className='flex flex-col'>

            <EmojiPickerPopup
                icon={Income.icon}
                onSelect={(selectedIncon) => handleChange('icon', selectedIncon)}
            />

            <input
                className='mt-4 p-3 border border-gray-400 rounded-lg'
                value={Income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance, salary, etc"
                type="text"
            />
            <input
                className='mt-4 p-3 border border-gray-400 rounded-lg'
                value={Income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="Amount"
                type="number"
            />
            <input
                className='mt-4 p-3 border border-gray-400 rounded-lg'
                value={Income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />
            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddIncome(Income)}
                >
                    Add Income
                </button>

            </div>
        </div>
    )
}

export default AddIncomeForm
