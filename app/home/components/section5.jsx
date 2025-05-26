'use client'
import React from 'react';

export default function Section5() {
    return (
        <div className='section-5 pt-[500px]'>
            <div className='container w-full h-[400px] relative'>
                {/* Перевёрнутый SVG с длинными черными линиями */}
                <svg
                    className="absolute left-0 top-0 w-full h-full rotate-180"
                    viewBox="0 0 1000 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M 100 300 C 350 150, 650 150, 900 300"
                        stroke="#000000"
                        strokeWidth="6"
                        strokeDasharray="180 40"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
}
