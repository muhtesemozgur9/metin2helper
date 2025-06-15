import React from 'react'
import { useNavigate } from 'react-router-dom'

const games = [
    {
        key: 'catch-the-king',
        title: 'Kralı Yakala',
        description: 'Metin2 etkinliğini simüle et, kralı ilk yakala!',
        icon: '/catch-king-icon.png',
        route: '/catch-the-king'
    }
    // Yeni oyunlar buraya eklenecek
]

export default function Dashboard() {
    const nav = useNavigate()
    const baseCard = {
        cursor:'pointer',
        padding:20,
        background:'var(--beige)',
        borderRadius:8,
        boxShadow:'0 2px 4px rgba(0,0,0,0.1)',
        transition:'transform .1s, box-shadow .1s'
    }

    return (
        <>
            <h1 style={{ fontSize:40, color:'var(--gold)', marginBottom:24 }}>
                Metin2 Helper Panosu
            </h1>
            <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))',
                gap:24
            }}>
                {games.map(g => (
                    <div
                        key={g.key}
                        style={baseCard}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform='scale(1.02)'
                            e.currentTarget.style.boxShadow='0 4px 8px rgba(0,0,0,0.2)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform='scale(1)'
                            e.currentTarget.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        onClick={() => nav(g.route)}
                    >
                        <img src={g.icon} alt={g.title} style={{ width:48, height:48, marginBottom:12 }} />
                        <h2 style={{ fontSize:24, marginBottom:8 }}>{g.title}</h2>
                        <p>{g.description}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
