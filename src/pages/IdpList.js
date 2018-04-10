import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button, ButtonGroup, InputGroup, FormControl} from 'react-bootstrap';
import Idp from './Idp';

class IdpList extends Component {

    render() {
        let isFetching = this.props.isFetching;
        let idps = this.props.idps.items;

        let selected = null;
        selected = (<Row className="previous-selected-idp">
            <Col lg={4} lgOffset={4}>
                <Idp name={"abc"} country={"nl"} icon={null}/>
            </Col>
        </Row>);

        let rows = null;
        if(isFetching) {
            rows = (
                <Row>
                    <Col lg={6} lgOffset={3}>
                        <span>Loading idp data...</span>)
                    </Col>
                </Row>
            );
        } else {
            rows = idps.map(idp => (
                <Row key={idp.entityID}>
                    <Col lg={6} lgOffset={3}>
                        <Idp name={idp.titles[0].value} country={idp.country} icon={idp.icon}/>
                    </Col>
                </Row>
            ));
        }
        return (
            <div className="idpList">
                {selected}
                <Row>
                    <Col lg={4} lgOffset={3}>
                        <InputGroup>
                            <InputGroup.Addon><i className="fas fa-search"></i></InputGroup.Addon>
                            <FormControl
                                type="text"
                                defaultValue=""
                                placeholder="Search for your home organization..."
                                onChange={e => {e.preventDefault(); this.props.patternChange(e.target.value)}} />
                        </InputGroup>
                    </Col>
                    <Col lg={2}>
                        <FormControl componentClass="select" placeholder="filter">
                        <option value="filter">Filter by country</option>
                            <option value="eu">eu</option>
                            <option value="nl">nl</option>
                        </FormControl>
                    </Col>
                </Row>
                {rows}
                <Row>
                    <Col lg={6} lgOffset={3}>
                        <Row>
                            <Col lg={4}>
                                <ButtonGroup>
                                    <Button onClick={e => {e.preventDefault(); this.props.previousPageClick()}}>
                                        <i className="fa fas fa-angle-left"></i>
                                    </Button>
                                    <Button onClick={e => {e.preventDefault(); this.props.firstPageClick()}}>
                                        <i className="fa fas fa-angle-double-left"></i>
                                    </Button>
                                </ButtonGroup>
                            </Col>
                            <Col lg={4} className="stats">
                                <span>{this.props.idps.index+1} to {this.props.idps.index+this.props.idps.show} out of {this.props.idps.total} total.</span>
                            </Col>
                            <Col lg={4}>
                                <ButtonGroup>
                                    <Button onClick={e => {e.preventDefault(); this.props.lastPageClick()}}>
                                        <i className="fa fas fa-angle-double-right"></i>
                                    </Button>
                                    <Button onClick={e => {e.preventDefault(); this.props.nextPageClick()}}>
                                        <i className="fa fas fa-angle-right"></i>
                                    </Button>
                                </ButtonGroup>
                            </Col>
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
        index: PropTypes.number.isRequired,
        show: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        items: PropTypes.array.isRequired,
    }).isRequired,
    previousPageClick: PropTypes.func.isRequired,
    nextPageClick: PropTypes.func.isRequired,
    firstPageClick: PropTypes.func.isRequired,
    lastPageClick: PropTypes.func.isRequired,
    patternChange: PropTypes.func.isRequired,
};

IdpList.defaultProps = {
    idps:[],
};

export default IdpList;