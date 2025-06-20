import React from 'react'
import input from '../Inputs/Input'
import { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup'


function AddExpenseForm({ onAddExpense }) {
    const [Income, setIncome] = useState({
        category: "",
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
                value={Income.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Expense Category"
                placeholder="Food, Entertainment, etc"
                type="text"
            />
            <input
                className='mt-4 p-3 border border-gray-400 rounded-lg'
                value={Income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="Enter amount"
                type="number"
            />
            <input
                className='mt-4 p-3 border border-gray-400 rounded-lg'
                value={Income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder="Enter date"
                type="date"
            />
            <div className='flex justify-end mt-6'>
                <button className='add-btn add-btn-fill' onClick={() => onAddExpense(Income)}>Add Expense</button>
            </div>
        </div>
    )
}

export default AddExpenseForm
