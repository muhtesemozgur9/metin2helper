// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'

const icons = Object
    .keys(solidIcons)
    .filter(key => key.startsWith('fa'))
    .map(key => solidIcons[key])

library.add(...icons)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode><App /></React.StrictMode>
)
