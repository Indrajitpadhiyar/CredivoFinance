import React from 'react'

function InfoCard({ icon, label, value, color }) {
  return (
    <div className='w-full flex gap-6 p-5'>
      <div className={`w-100 flex gap-6  p-6 rounded-2xl border-2 border-gray-300 hover:shadow-lg`}>


        <div className={`w-14 h-14 flex justify-center items-center text-[25px] text-white ${color} rounded-full drop-shadow-xl`}>
          {icon}
        </div>
        <div>
          <h6 className=''>
            {label}
          </h6>
          <span className='text-[20px] font-semibold'>
            ₹{value}
          </span>
        </div>
      </div>

    </div>
  )
}

export default InfoCard
