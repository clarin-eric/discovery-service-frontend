import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
//import * as qs from "query-string";

class Footer extends Component {
    /*
    constructor(props) {
        super(props);
        this.state = {"entity_id": null, "return": null}
    }
    componentWillMount() {
        var query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        this.setState({"entity_id": query.entityID, "return": query.return})
    }
*/
    render() {
        return (
            <div id="footer">
                <div className="container">
                    <Row>
                        <Col lg={3} className="text-left">
                            <a href="/about">About</a><br /><span className="footer-fineprint">{window.config.version}</span>
                        </Col>
                        <Col lg={6}>
                            <span className="footer-fineprint">
                                Service provided by <a href={window.config.website}>CLARIN</a>
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
}

Footer.propTypes = {}
Footer.defaultProps = {};

export default Footer;