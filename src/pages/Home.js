import React, { Component } from 'react';
import './Home.css';
import VisibleIdpList from '../containers/IdpListContainer.js';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <VisibleIdpList />
            </div>
        );
    }
}

export default Home;