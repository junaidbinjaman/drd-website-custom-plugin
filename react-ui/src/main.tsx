import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const userRoot = document.getElementById('drd-user-interface');

if (userRoot) {
    createRoot(userRoot).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}
