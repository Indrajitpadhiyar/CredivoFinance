import React from 'react'
import { useState, useRef } from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfileSelect = ({ image, setImage }) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const hendleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Update the image state
            setImage(file);

            // Genarate previewUrl from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        };
    }

    const handelImageRemove = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className='flex justify-center mb-6'>

            <input
                type="file"
                accept='image/*'
                ref={inputRef}
                onChange={hendleImageChange}
                className='hidden'
            />

            {!image ? (
                <div
                    onClick={onChooseFile}
                    className='flex flex-col items-center justify-center w-30 h-30 border-2 border-gray-500 border-dashed rounded-full cursor-pointer hover:bg-gray-100 hover:border-gray-400'
                >    
                    <LuUpload className='text-2xl text-gray-400' />
                    <p className='mt-2 text-sm text-gray-500'>Upload a PHoto</p>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center w-30 h-30 border-2 border-gray-400 border-dashed rounded-full cursor-pointer hover:bg-gray-100 hover:border-gray-400'>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="overflow-hidden w-full h-full object-cover rounded-full"
                    />
                    <button
                    className="absolute top-[25%] right-[40%] flex items-center justify-center bg-red-500 w-7 h-7 rounded-full text-white hover:text-gray-600"
                        onClick={handelImageRemove}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}

        </div>
    )
};


export default ProfileSelect
