import './styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import FragmentsPage from './pages/FragmentsPage'
import NewFragmentPage from './pages/NewFragmentPage'
import TagsPage from './pages/TagsPage'
import TagDetailPage from './pages/TagDetailPage'
import AboutPage from './pages/AboutPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/fragment" replace />} />
          <Route path="/fragment" element={<FragmentsPage />} />
          <Route path="/formulaire" element={<NewFragmentPage />} />
          <Route path="/tag" element={<TagsPage />} />
          <Route path="/tag/:tagName" element={<TagDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
