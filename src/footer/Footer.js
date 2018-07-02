import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Footer extends Component {
    render() {
        return (
            <div id="footer">
                <div className="container">
                    <Row>
                        <Col lg={3} className="text-left">
                            <a href="/about">About</a><br /><span className="footer-fineprint">{this.props.version.value}</span>
                        </Col>
                        <Col lg={6}>
                            <span className="footer-fineprint">Service provided by <a href="https://www.clarin.eu">CLARIN</a></span>
                        </Col>
                        <Col lg={3} className="text-right">
                            <a href="mailto:spf@clarin.eu">Contact</a>
                        </Col>
                    </Row>
                </div>
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