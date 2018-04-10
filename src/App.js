import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './header/Header.js';
import Footer from './footer/Footer.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import { CookiesProvider } from 'react-cookie';
import './App.css';

class App extends Component {
    render() {
        return (

            <Router>
                <CookiesProvider>
                    <div className="main">
                        <Header />
                        <div id="main">
                            <div className="container">
                                <Route exact path="/" component={Home}/>
                                <Route path="/about" component={About}/>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </CookiesProvider>
            </Router>

        );
    }
}

export default App;
