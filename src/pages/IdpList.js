import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import Idp from './Idp';

class IdpList extends Component {

    render() {
        let isFetching = this.props.isFetching;
        let idps = this.props.idps.items;

        let rows = null;

        if(isFetching) {
            rows = (
                <Row>
                    <Col lg={4} lgOffset={4}>
                        <span>Loading idp data...</span>)
                    </Col>
                </Row>
            );
        } else {
            rows = idps.map(idp => (
                <Row key={idp.entityID}>
                    <Col lg={4} lgOffset={4}>
                        <Idp name={idp.titles[0].value} country={idp.country} icon={idp.icon}/>
                    </Col>
                </Row>
            ));
        }
        return (
            <div className="idpList">
                {rows}
            </div>
        );
    }
}

IdpList.propTypes = {
    idps: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        items: PropTypes.array.isRequired
    }).isRequired
};

IdpList.defaultProps = {
    idps:[],
};

export default IdpList;