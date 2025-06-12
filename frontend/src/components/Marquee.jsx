import { motion } from 'framer-motion'
import React from 'react'

const Marquee = () => {

    return (
        <div className='w-full py-20 rounded-t-3xl bg-slate-900'>
            <div className="text text-white border-t-2 border-b-2 border-zinc-300 flex whitespace-nowrap">
                <motion.h3
                    initial={{ x: "0%" }}
                    animate={{ x: "-100%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 10
                    }}
                    className='text-[17vw] leading-none pr-20 font-semibold uppercase pt-10 -mb-10 whitespace-nowrap'
                >
                    Manage Your Income
                </motion.h3>

                <motion.h3
                    initial={{ x: "0%" }}
                    animate={{ x: "-100%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 10
                    }}
                    className='text-[17vw] leading-none pr-20 font-semibold uppercase pt-10 mb-10 whitespace-nowrap'
                >
                    Manage Your Income
                </motion.h3> 
            </div>
        </div>
    )
}

export default Marquee
