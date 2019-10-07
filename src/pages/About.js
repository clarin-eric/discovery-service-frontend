import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';

class About extends Component {

    render() {
        return (
            <Row className="text-left">
                <Col lg={12}>
                    <h1>About the CLARIN Discovery Service</h1>
                </Col>
                <Col lg={12}>
                    <h2 id="references">References</h2>
                    <ul>
                        <li><a href="https://www.clarin.eu/content/clarin-discovery-service">CLARIN Discovery Service</a></li>
                    </ul>
                </Col>
                <Col lg={12}>
                    <h2 id="version">Version information</h2>
                    <p>Application version number: {/*this.props.version.value*/window.config.version}</p>
                </Col>
                <Col lg={12}>
                    <h2 id="credits">Credits</h2>
                    <p>The following people have contributed to the CLARIN discovery service:</p>
                    <ul>
                        <li>André Moreira</li>
                        <li>Dieter van Uytvanck</li>
                        <li>Willem Elbers</li>
                    </ul>
                    <p>Icons by <a href="http://glyphicons.com/">Glyphicons</a> and <a href="https://fontawesome.com/">Font Awesome</a>.</p>
                    <p>Country flag icons designed by Freepik from <a href="https://www.flaticon.com/">Flaticon</a>.</p>
                </Col>
                <Col lg={12}>
                    <h2 id="sources">Source code</h2>
                    <p>Source code is available on <a href="https://github.com/clarin-eric/discovery-service-frontend">GitHub</a>.</p>
                </Col>
                <Col lg={12}>
                    <h2 id="Licence">Licence</h2>
                    <div className="licenceText">
                        <p>Copyright (C) 2010-2016 CLARIN ERIC</p>
                        <p>This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.</p>
                        <p>This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.</p>
                        <p>You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.</p>
                    </div>
                    <p>See <a href="#sources">Source code</a> section above for information on how to obtain source code.</p>
                </Col>
                <Col lg={12}>
                    <h2 id="technology">Technology used</h2>
                    <ul>
                        <li><a href="https://reactjs.org/">React</a> (version 16.3.2)</li>
                        <li><a href="http://getbootstrap.com/docs/3.3/">Bootstrap</a> (version 3.3.5)</li>
                    </ul>
                </Col>
            </Row>
        );
    }
}

About.propTypes = {}
About.defaultProps = {};

export default About;