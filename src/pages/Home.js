import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import './Home.css';
import FLAG_EU from './flags/europeanunion.png';
import FLAG_DK from './flags/dk.png';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col lg={4} lgOffset={4} className="idp">
                        <div className="idp-title">CLARIN eu website account</div>
                        <div className="idp-country"><img src={FLAG_EU} alt="Flag EU"></img>European union</div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} lgOffset={4} className="idp">
                        <div className="idp-title">Aalborg university</div>
                        <div className="idp-country"><img src={FLAG_DK} alt="Flag DK"></img> Denmark</div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;