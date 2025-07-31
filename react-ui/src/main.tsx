import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Admin from "./Admin.tsx";
import {QueryClientContext} from "@/context/QueryClientContext.tsx";

const adminRoot = document.getElementById('drd-admin-interface');

if (adminRoot) {
    createRoot(adminRoot).render(
        <StrictMode>
            <QueryClientContext>
                <Admin />
            </QueryClientContext>
        </StrictMode>
    );
}
