"use client"

import React, { useState, useEffect } from 'react';

export default function Grid() {
    const [gridState, setGridState] = useState([])

    useEffect(() => {
        let matrix = []
        for (let i = 0; i < 10; i++) {
            let subArray = []
            for (let i = 0; i < 10; i++) {
                subArray.push([])
            }
            matrix.push(subArray)
        }
        setGridState(matrix)
    }, [])

    return (
        <section>
            <pre>
                {JSON.stringify(gridState, null, 4)}
            </pre>
            {gridState.map(e => {
                return (
                    
                )
            })}
        </section>
    )
}