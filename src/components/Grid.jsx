"use client"

import React, { useState, useEffect, useRef } from 'react';

export default function Grid(props) {
    return (
        <section 
            className='w-full h-full relative cursor-move'
            onMouseDown={e => props.handleMouseDown(e)}
            onMouseUp={e => props.handleMouseUp(e)}
            onMouseMove={e => props.handleMouseMove(e)}
            onWheel={e => props.handleOnWheel(e)}
        >
            <div 
                className='absolute'
                style={{
                    transform: `translate(${props.gridPos.x}px, ${props.gridPos.y}px)`
                }}    
            >
                <canvas
                    ref={props.canvasRef}
                    id='canvas'
                    className='rounded-md canvas shadow-md'
                    width={5050} 
                    height={5050}
                    style={{ width: 100 * props.scale, height: 100 * props.scale }}
                >
                </canvas>
            </div>
        </section>
    )
}