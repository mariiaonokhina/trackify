import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css'
import HomePage from './routes/HomePage.tsx';
import Layout from './routes/Layout.tsx';
import LogInSignUpPage from './routes/LogInSignUpPage.tsx';
import Profile from './routes/Profile.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
		  <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LogInSignUpPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
		  </Routes>
	  </BrowserRouter>
  </StrictMode>,
)
