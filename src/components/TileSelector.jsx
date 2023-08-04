"use client"

import React, { useState, useEffect } from 'react';

export default function TileSelector(props) {
    const [box, setBox] = useState({ width: 50, height: 50 })

    useEffect(() => {
        setBox({ width: props.selectorRef.current.clientWidth, height: props.selectorRef.current.clientHeight })
        // console.log(props.selectorRef)
    }, [props.scale])

    return (
        <section 
            className='absolute top-0 left-0 pointer-events-none grid place-items-center w-screen h-screen'
            style={{
                transform: `translate(${props.gridPos.x % props.scale}px, ${props.gridPos.y % props.scale}px)`
            }} 
        >
            <div ref={props.selectorRef} className='bg-white' style={{ width: props.scale, height: props.scale }}></div>
        </section>
    )
}