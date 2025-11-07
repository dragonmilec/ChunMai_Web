import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import ProjectDetail from './pages/ProjectDetail'
import Services from './pages/Services'
import Contact from './pages/Contact'
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <div className="min-h-screen bg-slate-900 text-white">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/portfolio/:id" element={<ProjectDetail />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#1e293b',
                            color: '#f1f5f9',
                            border: '1px solid #334155'
                        }
                    }}
                />
            </div>
        </BrowserRouter>
    )
}

export default App;
