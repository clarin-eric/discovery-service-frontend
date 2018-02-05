import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col lg={4} lgOffset={4}>
                        <div>
                            CLARIN eu website account
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} lgOffset={4}>
                        <div>
                            Aalborg university
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;