import React, { Component } from 'react';
import './Footer.css';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Footer extends Component {
    render() {
        return (
            <div id="footer" className="container-fluid">
                <Row>
                    <Col lg={3}>
                        <a href="/about">About</a><br /><span className="footer-fineprint">{this.props.version.value}</span>
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

Footer.propTypes = {
    version: PropTypes.shape({
        fetching: PropTypes.bool.isRequired,
        value: PropTypes.string.isRequired,
    })
}


Footer.defaultProps = {
    version: {
        fetching: false,
        value: "n/a"
    },
};

export default Footer;