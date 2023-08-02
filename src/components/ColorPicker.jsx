"use client"

import React, { useState, useEffect } from 'react';

export default function ColorPicker() {
    const [toggle, setToggle] = useState(false)

    return (
        <section className='absolute h-24 w-full bg-white transition-all' style={{ top: `calc(100% - ${toggle ? "6rem" : "0rem"})` }}>
            <button className='bg-black absolute_center_x bottom-full' onClick={() => setToggle(prev => !prev)}>Toggle</button>
            <div className='w-4 h-full bg-red-600'></div>
        </section>
    )
}