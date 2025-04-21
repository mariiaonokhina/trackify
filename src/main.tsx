import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css'
import HomePage from './routes/HomePage.tsx';
import Layout from './routes/Layout.tsx';
import LogInSignUpPage from './routes/LogInSignUpPage.tsx';
import Profile from './routes/Profile.tsx';
import ResumeAnalyzer from './routes/ResumeAnalyzer.tsx';
import ApplyResourcePage from './routes/ApplyResourcePage.tsx';
import LandingPage from './routes/LandingPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
		  <Routes>
        <Route path="/" element={<Layout />}>
	<Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/apply" element={<ApplyResourcePage />} />
          <Route path="/login" element={<LogInSignUpPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        </Route>
		  </Routes>
	  </BrowserRouter>
  </StrictMode>,
)
