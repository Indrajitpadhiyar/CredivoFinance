import React from 'react'

function Modal({ children, isOpen, onClose, title }) {
    if (!isOpen) return null
    return (
        <div className='fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
            <div className='reletive p-4 w-full max-w-2xl max-h-[70vh] '>
                {/* MODAL CONTENT  */}
                <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-700'>
                    {/* Modal Hander */}
                    <div className='flex items-start justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-600'>
                        <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
                            {title}
                        </h3>
                        <button
                            type='button'
                            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                            onClick={onClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                                <path d="M 7.7070312 6.2929688 L 6.2929688 7.7070312 L 23.585938 25 L 6.2929688 42.292969 L 7.7070312 43.707031 L 25 26.414062 L 42.292969 43.707031 L 43.707031 42.292969 L 26.414062 25 L 43.707031 7.7070312 L 42.292969 6.2929688 L 25 23.585938 L 7.7070312 6.2929688 z"></path>
                            </svg>
                        </button>
                    </div>
                    {/* Modal body  */}
                    <div className='p-4 md:p-5 space-y-4'>
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal
