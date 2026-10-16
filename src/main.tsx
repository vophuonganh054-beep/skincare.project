import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { RouterProvider } from './context/RouterContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
);

