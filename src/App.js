import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import Home from './Home.js';
import About from './About.js';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
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
            </Router>
        );
    }
}

export default App;
