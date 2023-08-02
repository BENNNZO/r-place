import React from 'react';

export default function TileSelector(props) {
    return (
        <section 
            className='w-screen h-screen absolute top-0 left-0 pointer-events-none'
            style={{
                transform: `translate(${props.gridPos.x % props.selectorRef.current.clientWidth}px, ${props.gridPos.y % props.selectorRef.current.clientHeight}px)`
            }} 
        >
            <div ref={props.selectorRef} className='bg-white' style={{ width: props.scale, height: props.scale }}></div>
        </section>
    )
}