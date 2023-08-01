"use client"

import React, { useState, useEffect } from 'react';

export default function Grid() {
    // const [gridState, setGridState] = useState([])
    const [prevGridPos, setPrevGridPos] = useState({ x: 0, y: 0 })
    const [gridPos, setGridPos] = useState({ x: 0, y: 0 })

    const [mouseStart, setMouseStart] = useState(0)
    const [moveState, setMoveState] = useState(false)

    const [scale, setScale] = useState(1)

    const WIDTH = 375
    const HEIGHT = 250

    useEffect(() => {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        let widthConst = canvas.width / WIDTH
        let heightConst = canvas.height / HEIGHT

        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                context.fillStyle = `rgb(${255 / WIDTH * x * 35 % 255}, ${255 / HEIGHT * y * 35 % 255}, 0)`;
                // context.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                context.fillRect(widthConst * x, heightConst * y, widthConst, heightConst);
            }
        }

        context.translate(0.5, 0.5)
        context.imageSmoothinEnabled = false
    }, [])

    function handleMouseDown(e) {
        setMoveState(true)
        setMouseStart({ x: e.clientX, y: e.clientY })
        setPrevGridPos({ x: gridPos.x, y: gridPos.y })
    }

    function handleMouseUp(e) {
        setMoveState(false)
        setMouseStart({ x: e.clientX, y: e.clientY })
    }

    function handleMouseMove(e) {
        if (moveState === true) {
            setGridPos({ x: prevGridPos.x - (mouseStart.x - e.clientX), y: prevGridPos.y - (mouseStart.y - e.clientY) })
        }
    }

    function handleOnWheel(e) {
        let xs = (e.clientX - gridPos.x) / scale
        let ys = (e.clientY - gridPos.y) / scale

            if (e.deltaY < 0) {
                // if (scale * 1.25 < 20) {
                    console.log("up")
                    setScale(prev => prev *= 1.25)
                    setGridPos({ x: e.clientX - xs * (scale * 1.25), y: e.clientY - ys * (scale * 1.25) })
                // }
            } else {
                if (scale / 1.25 > 1) {
                    console.log("down")
                    setScale(prev => prev /= 1.25)
                    setGridPos({ x: e.clientX - xs * (scale / 1.25), y: e.clientY - ys * (scale / 1.25) })
                }
            }
    }

    return (
        <section 
            className='w-full h-full border-2 border-red-400 relative cursor-move'
            onMouseDown={e => handleMouseDown(e)}
            onMouseUp={e => handleMouseUp(e)}
            onMouseMove={e => handleMouseMove(e)}
            onWheel={e => handleOnWheel(e)}
        >
            <div className=' select-none absolute top-0 left-1/2'>
                <p>{JSON.stringify(gridPos)}</p>
                <p>{JSON.stringify(prevGridPos)}</p>
                <p>{JSON.stringify(mouseStart)}</p>
                <p>{JSON.stringify(moveState)}</p>
                <p>{JSON.stringify(scale)}</p>
            </div>
            <div 
                className='absolute'
                style={{
                    transform: `translate(${gridPos.x}px, ${gridPos.y}px)`
                }}    
            >
                <canvas id='canvas' className='border-2 border-white rounded-md' width={7500} height={5000} style={{ width: 750 * scale, height: 500 * scale, imageRendering: "crisp-edges" }}>


                </canvas>
                {/* {gridState.map(e => (
                    <div className='flex flex-row pointer-events-none' draggable={false}>
                        {e.map(e => (
                            <span className='w-3 h-3 bg-white border border-red-400 pointer-events-none' draggable={false}>

                            </span>
                        ))}
                    </div>
                ))} */}
            </div>
        </section>
    )
}