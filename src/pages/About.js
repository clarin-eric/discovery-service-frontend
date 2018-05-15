import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

class About extends Component {
    render() {
        return (
            <Row className="about">
                <Col lg={12}>
                    <h1>About the CLARIN Discovery Service</h1>
                </Col>
                <Col lg={12}>
                    <a name="references"><h2>References</h2></a>
                    <ul>
                        <li><a href="https://www.clarin.eu/content/clarin-discovery-service">CLARIN Discovery Service</a></li>
                    </ul>
                </Col>
                <Col lg={12}>
                    <a name="version"><h2>Version information</h2></a>
                    <p>Application version number: {this.props.version.value}</p>
                </Col>
                <Col lg={12}>
                    <a name="credits"><h2>Credits</h2></a>
                    <p>The following people have contributed to the VLO faceted browser:</p>
                    <ul>
                        <li>André Moreira</li>
                        <li>Dieter van Uytvanck</li>
                        <li>Willem Elbers</li>
                    </ul>
                    <p>Icons by <a href="http://glyphicons.com/">Glyphicons</a> and <a href="https://fontawesome.com/">Font Awesome</a>.</p>
                </Col>
                <Col lg={12}>
                    <a name="sources"><h2>Source code</h2></a>
                    <p>Source code is available on <a href="https://github.com/clarin-eric/discovery-service-frontend">GitHub</a>.</p>
                </Col>
                <Col lg={12}>
                    <a name="Licence"><h2>Licence</h2></a>
                    <div className="licenceText">
                        <p>Copyright (C) 2010-2016 CLARIN ERIC</p>
                        <p>This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.</p>
                        <p>This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.</p>
                        <p>You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.</p>
                    </div>
                    <p>See <a href="#sources">Source code</a> section above for information on how to obtain source code.</p>
                </Col>
                <Col lg={12}>
                    <a name="technology>"><h2>Technology used</h2></a>
                    <ul>
                        <li><a href="https://reactjs.org/">React</a> (version 16.3.2)</li>
                        <li><a href="http://getbootstrap.com/docs/3.3/">Bootstrap</a> (version 3.3.5)</li>
                    </ul>
                </Col>
            </Row>
        );
    }
}

About.propTypes = {
    version: PropTypes.shape({
        fetching: PropTypes.bool.isRequired,
        value: PropTypes.string.isRequired,
    })
}


About.defaultProps = {
    version: {
        fetching: false,
        value: "n/a"
    },
};

export default About;