import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Home from './Home.js';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Home />
                <Footer />
            </div>
        );
    }
}

export default App;
