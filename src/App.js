import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './header/Header.js';
import FooterContainer from './containers/FooterContainer';
import QueryParametersEnhancedHome from './containers/HomeContainer.js';
import AboutContainer from './containers/AboutContainer';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="main">
                    <Header />
                    <div id="main">
                        <div className="container">
                            <Route exact path="/" component={QueryParametersEnhancedHome}/>
                            <Route path="/about" component={AboutContainer}/>
                        </div>
                    </div>
                    <FooterContainer />
                </div>
            </Router>
        );
    }
}

export default App;
