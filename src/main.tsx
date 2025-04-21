import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css'
import HomePage from './routes/HomePage.tsx';
import Layout from './routes/Layout.tsx';
import LogInSignUpPage from './routes/LogInSignUpPage.tsx';
import ApplyResourcePage from './routes/ApplyResourcePage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
		  <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/apply" element={<ApplyResourcePage />} />
          <Route path="/login" element={<LogInSignUpPage />} />
        </Route>
		  </Routes>
	  </BrowserRouter>
  </StrictMode>,
)
