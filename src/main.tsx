import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Fontes servidas deste domínio: numa página que abre em entrevista, um
// terceiro no caminho crítico é latência que não depende de nós.
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'

import './styles/index.css'
import App from './App'
import { I18nProvider } from './i18n/I18nProvider'
import { ThemeProvider } from './theme/ThemeProvider'

const container = document.getElementById('root')
if (!container) throw new Error('Elemento #root nao encontrado no index.html')

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
