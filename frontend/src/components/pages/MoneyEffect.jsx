// // import React, { use } from 'react'
// import gsap from 'gsap'
// import { useGSAP } from '@gsap/react';

// const MoneyEffect = () => {

//     useGSAP(() => {
//         gsap.from('.text-1', {
//             opacity: 0,
//             duration: 1,
//             y: 100,
//             delay: 1,
//             scrollTrigger: {
//                 scroller: '.main',
//                 trigger: '.text',
//                 start: 'top top',
//                 end: 'bottom top',
//                 scrub: 1
//             }
//         })
//     })
//     useGSAP(() => {
//         gsap.from('.text-2', {
//             opacity: 0,
//             duration: 1,
//             y: 100,
//             scrollTrigger: {
//                 scroller: '.main',
//                 trigger: '.text-2',
//                 start: 'top top',
//                 end: 'bottom top',
//                 scrub: 1
//             }
//         })
//     })
//     useGSAP(() => {
//         gsap.from('.text-3', {
//             opacity: 0,
//             duration: 1,
//             y: 100,
//             scrollTrigger: {
//                 scroller: '.main',
//                 trigger: '.text-3',
//                 start: 'top top',
//                 end: 'bottom top',
//                 scrub: 1
//             }
//         })
//     })


//     return (
//         <div
//             className='w-full h-screen text-div flex justify-center overflow-hidden items-center flex-col uppercase'
//             style={{
//                 cursor: "url('/image/cursor.png') 8 8, auto",
//             }}
//         >
//             <div className=' w-[50vw] overflow-hidden'>
//                 <h2 className='text-1 text-9xl font-semibold flex justify-center items-center text-gray-600'>Manage</h2>
//             </div>
//             <div className=' w-[50vw] overflow-hidden'>
//                 <h2 className='text-9xl text-2 font-semibold flex justify-center items-center text-red-500'>your</h2>
//             </div>
//             <div className=' w-[50vw] overflow-hidden'>
//                 <h2 className='text-9xl text-3 font-semibold flex justify-center items-center text-gray-600'>Money</h2>
//             </div>
//         </div >
//     )
// }

// export default MoneyEffect  