import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Admin from "./Admin.tsx";

const adminRoot = document.getElementById('drd-admin-interface');

if (adminRoot) {
    createRoot(adminRoot).render(
        <StrictMode>
            <Admin />
        </StrictMode>
    );
}
