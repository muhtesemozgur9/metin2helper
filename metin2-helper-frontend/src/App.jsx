import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CatchTheKing from './features/catchTheKing/pages/CatchTheKing'

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/catch-the-king" element={<CatchTheKing />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}
