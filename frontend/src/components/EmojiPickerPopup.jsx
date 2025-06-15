import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [IsOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col md:flex-row items-start gap-5 mb-6 relative'>
            {/* Trigger area with close button */}
            <div className='relative'>
                <div
                    className='flex items-center gap-4 cursor-pointer'
                    onClick={() => setIsOpen(true)}
                >
                    <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg'>
                        {icon ? (
                            <img src={icon} alt="" className='w-12 h-12' />
                        ) : (
                            <LuImage />
                        )}
                    </div>
                    <p>{icon ? "Change Icon " : "Select Icon"}</p>
                </div>

                {IsOpen && (
                    <button
                        className='w-6 h-6 flex items-center justify-center bg-white border border-gray-200 shadow-sm rounded-full absolute -top-2 -right-95 z-50 cursor-pointer'
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX />
                    </button>
                )}
            </div>

            {/* Emoji Picker */}
            {IsOpen && (
                <div>
                    <EmojiPicker
                        open={IsOpen}
                        onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;
