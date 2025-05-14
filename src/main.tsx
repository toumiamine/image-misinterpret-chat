
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AvatarProvider } from './contexts/AvatarContext'

createRoot(document.getElementById("root")!).render(
  <AvatarProvider>
    <App />
  </AvatarProvider>
);
