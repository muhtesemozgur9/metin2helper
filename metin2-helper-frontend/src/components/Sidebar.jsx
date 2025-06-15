import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const linkStyle = ({ isActive }) => ({
    display: 'block',
    padding: '12px 20px',
    fontWeight: 600,
    background: isActive ? 'var(--brown)' : 'transparent',
    color: isActive ? '#fff' : 'var(--beige)'
})

export default function Sidebar() {
    return (
        <aside style={{
            width: 240,
            background: 'var(--brown)',
            color: 'var(--beige)'
        }}>
            <div style={{ padding: 20, display:'flex', alignItems:'center', gap:12 }}>
                <img src={logo} alt="Logo" style={{ width:40, height:40 }} />
                <h1 style={{ fontSize:20 }}>Metin2 Helper</h1>
            </div>
            <nav>
                <NavLink to="/"               style={linkStyle}>Dashboard</NavLink>
                <NavLink to="/catch-the-king" style={linkStyle}>Kralı Yakala</NavLink>
            </nav>
        </aside>
    )
}
