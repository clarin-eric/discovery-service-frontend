import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button} from 'react-bootstrap';
import Idp from './Idp';

class IdpList extends Component {

    render() {
        let isFetching = this.props.isFetching;
        let idps = this.props.idps.items;

        let selected = null;
        selected = (<Row>
            <Col lg={4} lgOffset={4}>
                <Idp name={"abc"} country={"nl"} icon={null}/>
            </Col>
        </Row>);

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
                {selected}
                <Row>
                    <Col lg={4} lgOffset={4}>
                        <input value="Search for your home organization..." width="100%"></input>
                    </Col>
                </Row>
                {rows}
                <Row>
                    <Col lg={4} lgOffset={4}>
                        <Row>
                            <Col lg={4}><Button onClick={e => {e.preventDefault(); this.props.previousPageClick()}}>P</Button></Col>
                            <Col lg={4}>-</Col>
                            <Col lg={4}><Button onClick={e => {e.preventDefault(); this.props.nextPageClick()}}>N</Button></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

IdpList.propTypes = {
    idps: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        items: PropTypes.array.isRequired
    }).isRequired,
    previousPageClick: PropTypes.func.isRequired,
    nextPageClick: PropTypes.func.isRequired,
};

IdpList.defaultProps = {
    idps:[],
};

export default IdpList;