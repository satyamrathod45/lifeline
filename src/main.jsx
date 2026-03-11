import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "leaflet/dist/leaflet.css"
import { AuthProvider } from "./context/AuthContext"
import App from './App.jsx'
import { Toaster } from "react-hot-toast"
import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <HashRouter>
      <AuthProvider>
      <App />
      <Toaster position="top-right" />
    </AuthProvider>
  </HashRouter>,
)
