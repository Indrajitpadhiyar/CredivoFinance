import React from 'react'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const Input = ({ value, onChange, placeholder, type }) => {

    const [ShowPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!ShowPassword)
    }
    return (
        <div>
            <input
                className='w-full p-2 rounded-2xl focus:outline-none'
                required
                type={type === 'password' ? ShowPassword ? 'text' : 'password' : type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => { onChange(e) }}
            />

            {type === 'password' &&(
                <>
                <button
                className='w-4 h-4 ml-11 mt-2 absolute'
                onClick={togglePassword}>
                    {ShowPassword ? <Eye /> : <EyeOff />}
                </button>
                </>
            )}
        </div>
    )
}

export default Input
