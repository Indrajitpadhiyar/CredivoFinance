import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const images = import.meta.glob('/public/frames22/*.{png,jpg,jpeg,svg}', { eager: true });
const CanvasImages = Object.values(images).map((img) => img.default);

gsap.registerPlugin(ScrollTrigger);

function Canvas() {
    const [Index, setIndex] = useState({ value: 0 });
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new window.Image();
        img.src = CanvasImages[Index.value];
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
    }, [Index]);

    const startAnimation = () => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".animate",
                scroller: ".main", 
                start: "top top",
                end: "bottom top",
                scrub: 1,
                // markers: true
            }
        });

        tl.to(Index, {
            value: 136,
            // duration: 100,
            ease: "linear",
            onUpdate: () => {
                setIndex({ value: Math.round(Index.value) });
            }
        });
    }

    useGSAP(startAnimation);

    return (
        <div className='w-full h-screen overflow-hidden'>
            <div className="animate flex items-center justify-center relative">
                <canvas
                    className='w-[50%] mt-40 h-[50%] sticky top-0 '
                    ref={canvasRef}
                    id='canvas'>
                </canvas>
            </div>
        </div>
    );
}

export default Canvas;
