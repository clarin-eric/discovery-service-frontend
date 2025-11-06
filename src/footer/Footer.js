import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
    return (
        <div id="footer">
            <div className="container">
                <Row>
                    <Col lg={3} className="text-left">
                        <a href="/about">About</a><br /><span className="footer-fineprint">{window.config.version}</span>
                    </Col>
                    <Col lg={6}>
                        <span className="footer-fineprint">
                            Service provided by <a href={window.config.website}>{window.config.website_label}</a>
                        </span>
                    </Col>
                    <Col lg={3} className="text-right">
                        <a href={"mailto:"+window.config.support_contact}>Contact</a>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Footer;