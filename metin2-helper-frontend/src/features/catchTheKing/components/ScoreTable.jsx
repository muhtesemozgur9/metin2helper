import React from 'react'

export default function ScoreTable({ scores }) {
    return (
        <div style={{
            marginTop:20,
            padding:16,
            background:'var(--beige)',
            borderRadius:8,
            boxShadow:'0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ marginBottom:8, fontSize:20 }}>Skorlar</h2>
            <table style={{ width:'100%', color:'var(--char)' }}>
                <thead>
                <tr>
                    <th align="left">Oyuncu</th>
                    <th align="left">Skor</th>
                </tr>
                </thead>
                <tbody>
                {scores.map((s,i) => (
                    <tr key={i} style={{ borderTop:'1px solid #ddd' }}>
                        <td style={{ padding:'8px 0' }}>{s.name}</td>
                        <td style={{ padding:'8px 0' }}>{s.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
