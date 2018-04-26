import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './header/Header.js';
import Footer from './footer/Footer.js';
import QueryParametersEnhancedHome from './containers/HomeContainer.js';
import About from './pages/About.js';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="main">
                    <Header />
                    <div id="main">
                        <div className="container">
                            <Route exact path="/" component={QueryParametersEnhancedHome}/>
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
