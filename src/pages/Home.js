import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import './Home.css';
import Idp from './Idp.js';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col lg={4} lgOffset={4} >
                       <Idp name={"CLARIN.eu website account"} country={"eu"} logo={"https://www.clarin.eu/sites/default/files/clarin-logo.png"} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} lgOffset={4} >
                        <Idp name={"Aalborg university"} country={"dk"} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} lgOffset={4} >
                        <Idp name={"Academy of Arts, Architecture and Design in Prague"} country={"cz"} logo={"https://www.umprum.cz/logos/um2-400-cz.png"} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;