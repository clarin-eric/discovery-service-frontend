import React, { Component } from 'react';
import './Footer.css';
import {Row, Col} from 'react-bootstrap';

class Footer extends Component {
    render() {
        return (
            <div id="footer" className="container-fluid">
                <Row>
                    <Col lg={3}>
                        <a href="/about">About</a><br /><span className="footer-fineprint">0.0.1</span>
                    </Col>
                    <Col className="footer-fineprint" lg={6}>
                        Service provided by <a href="https://www.clarin.eu">CLARIN</a>
                    </Col>
                    <Col lg={3}>
                        <a href="mailto:spf@clarin.eu">Contact</a>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Footer;