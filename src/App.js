import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './header/Header.js';
import Footer from './footer/Footer';
import Home from './pages/Home';
import About from './pages/About';

const App = () => {
    return (
        <BrowserRouter>
            <div className="main">
                <Header />
                <div id="main">
                    <div className="container my-4">
                        <Routes>
                            <Route exact path="/" element={<Home />}/>
                            <Route path="/feed/:id" element={<Home />}/>
                            <Route path="/about" element={<About />}/>
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
