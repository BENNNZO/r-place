"use client"

import Grid from "@/components/Grid"
import ColorPicker from "@/components/ColorPicker"
import TileSelector from "@/components/TileSelector";

import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
    /* ------------------------------- GLOBAL VARS ------------------------------ */
    const [windowDim, setWindowDim] = useState({ x: 0, y: 0 })

    const [prevGridPos, setPrevGridPos] = useState({ x: 0, y: 0 })
    const [gridPos, setGridPos] = useState({ x: 0, y: 0 })

    const [mouseStart, setMouseStart] = useState(0)
    const [moveState, setMoveState] = useState(false)

    const [scale, setScale] = useState(5)

    const WIDTH = 100
    const HEIGHT = 100

    const canvasRef = useRef()
    const selectorRef = useRef()

    useEffect(() => {
        console.log(selectorRef)
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        let widthConst = canvas.width / WIDTH
        let heightConst = canvas.height / HEIGHT

        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                // context.fillStyle = `rgb(${255 / HEIGHT * y}, ${255 / WIDTH * x}, 255)`;
                context.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                context.fillRect(widthConst * x, heightConst * y, widthConst / 1, heightConst / 1);
            }
        }

        context.translate(0.5, 0.5)
        context.imageSmoothinEnabled = false

        window.addEventListener("resize", e => {
            setWindowDim({ 
                x: window.innerWidth, 
                y: window.innerHeight 
            })
        })
        setWindowDim({ 
            x: window.innerWidth, 
            y: window.innerHeight 
        })
        setGridPos({ 
            x: (window.innerWidth / 2) - (canvasRef.current.clientWidth / 2), 
            y: (window.innerHeight / 2) - (canvasRef.current.clientHeight / 2) ,
        })
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
        <main className="bg-neutral-950 text-white h-screen relative overflow-hidden">
            <Grid 
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                handleMouseMove={handleMouseMove}
                handleOnWheel={handleOnWheel}

                gridPos={gridPos}
                scale={scale}

                canvasRef={canvasRef}
            />
            <ColorPicker
                scale={scale}
            />
            <TileSelector 
                scale={scale}
                gridPos={gridPos}
                selectorRef={selectorRef}
            />
        </main>
    )
}
