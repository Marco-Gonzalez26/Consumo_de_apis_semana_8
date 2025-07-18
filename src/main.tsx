import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ImageDetail from './ImageDetail.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/image/:id' element={<ImageDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
