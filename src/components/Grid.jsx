"use client"

import React, { useState, useEffect, useRef } from 'react';

export default function Grid() {
    // const [gridState, setGridState] = useState([])
    const [windowDim, setWindowDim] = useState({ x: 0, y: 0 })

    const [prevGridPos, setPrevGridPos] = useState({ x: 0, y: 0 })
    const [gridPos, setGridPos] = useState({ x: 0, y: 0 })

    const [mouseStart, setMouseStart] = useState(0)
    const [moveState, setMoveState] = useState(false)

    const [scale, setScale] = useState(5)

    const WIDTH = 100
    const HEIGHT = 100

    const canvasRef = useRef()

    useEffect(() => {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        let widthConst = canvas.width / WIDTH
        let heightConst = canvas.height / HEIGHT

        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                context.fillStyle = `rgb(255, ${255 / HEIGHT * y * 5 % 255}, ${255 / WIDTH * x * 5 % 255})`;
                // context.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                context.fillRect(widthConst * x, heightConst * y, widthConst, heightConst);
            }
        }

        context.translate(0.5, 0.5)
        context.imageSmoothinEnabled = false

        window.addEventListener("resize", e => {
            setWindowDim({ x: window.innerWidth, y: window.innerHeight })
        })
        setWindowDim({ x: window.innerWidth, y: window.innerHeight })
        setGridPos({ x: (window.innerWidth / 2) - (canvasRef.current.clientWidth / 2), y: (window.innerHeight / 2) - (canvasRef.current.clientHeight / 2) })
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
        let xMin = windowDim.x / 2 - canvasRef.current.clientWidth
        let xMax = windowDim.x / 2
        let yMin = windowDim.y / 2 - canvasRef.current.clientHeight 
        let yMax = windowDim.y / 2 

        if (moveState === true) {
            setGridPos({ 
                x: Math.max(xMin, Math.min(xMax, prevGridPos.x - (mouseStart.x - e.clientX))), 
                y: Math.max(yMin, Math.min(yMax, prevGridPos.y - (mouseStart.y - e.clientY)))
            })
        }
    }

    function handleOnWheel(e) {
        let xs = (e.clientX - gridPos.x) / scale
        let ys = (e.clientY - gridPos.y) / scale

            if (e.deltaY < 0) {
                if (scale * 1.25 < 150) {
                    console.log("up")
                    setScale(prev => prev *= 1.25)
                    setGridPos({ x: e.clientX - xs * (scale * 1.25), y: e.clientY - ys * (scale * 1.25) })
                }
            } else {
                if (scale / 1.25 > 4) {
                    console.log("down")
                    setScale(prev => prev /= 1.25)
                    setGridPos({ x: e.clientX - xs * (scale / 1.25), y: e.clientY - ys * (scale / 1.25) })
                }
            }
    }

    return (
        <section 
            className='w-full h-full relative cursor-move'
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
                <p>{JSON.stringify(windowDim)}</p>
            </div>
            <div 
                className='absolute'
                style={{
                    transform: `translate(${gridPos.x}px, ${gridPos.y}px)`
                }}    
            >
                <canvas
                    ref={canvasRef}
                    id='canvas'
                    className='rounded-md canvas'
                    width={5000} 
                    height={5000}
                    style={{ width: 100 * scale, height: 100 * scale }}
                >
                </canvas>
            </div>
        </section>
    )
}