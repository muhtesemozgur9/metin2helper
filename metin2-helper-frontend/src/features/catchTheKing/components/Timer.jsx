import React, { useState, useEffect } from 'react'

export default function Timer({ target }) {
    const [diff, setDiff] = useState(target - Date.now())

    useEffect(() => {
        const iv = setInterval(() => setDiff(target - Date.now()), 1000)
        return () => clearInterval(iv)
    }, [target])

    const m = String(Math.floor(diff / 60000)).padStart(2,'0')
    const s = String(Math.floor((diff % 60000)/1000)).padStart(2,'0')

    return (
        <div style={{
            display:'inline-block',
            padding:'16px 32px',
            background:'var(--brown)',
            color:'var(--gold)',
            fontSize:32,
            fontWeight:'bold',
            borderRadius:8,
            boxShadow:'0 4px 8px rgba(0,0,0,0.2)'
        }}>
            {m}:{s}
        </div>
    )
}
