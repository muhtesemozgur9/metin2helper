import React from 'react'
import { NavLink } from 'react-router-dom'
import './Layout.css'

export default function Layout({ children }) {
    return (
        <>
            <header className="navbar">
                <NavLink to="/"     className="nav-link">Dashboard</NavLink>
                <NavLink to="/catch-the-king" className="nav-link">Kralı Yakala</NavLink>
            </header>
            <main className="main-content">
                {children}
            </main>
        </>
    )
}
