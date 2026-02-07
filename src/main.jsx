import { React } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {HeroUIProvider} from '@heroui/react'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById('root')).render(
<CookiesProvider>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
</CookiesProvider>

)
