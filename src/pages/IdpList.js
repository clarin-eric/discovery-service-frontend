import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import PropTypes from 'prop-types';
import {Grid, Row, Col, Button, ButtonGroup, InputGroup, FormControl} from 'react-bootstrap';
import Idp from './Idp';
import { withCookies, Cookies } from 'react-cookie';

class IdpList extends Component {

    componentWillMount() {
        const { cookies } = this.props;

        //Set the selected idp entity id if a cookie with a valid value exists
        var entityId = cookies.get('entityid')
        if (entityId) {
            this.props.setSelectedIdp(entityId)
        } else {
            console.log("No selected entityId found");
        }
    }

    render() {
        var i = 0;
        const { isFetching } = this.props;
        let idps = this.props.idps.items;
        let selected_idp = this.props.idps.selected_idp;
        let country_list = this.props.idps.countries;
        let error_list = this.props.idps.errors;

        //Create an element for the selected idp, only if the selected_idp is set
        let selected = null;
        if(selected_idp) {
            selected = (<Row className="previous-selected-idp"
                             onClick={e => {e.preventDefault(); this.props.idpClick(this.props.cookies, selected_idp.entityID)}}>
                <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={12}>
                    <Idp
                        name={selected_idp.titles[0].value}
                        country={selected_idp.country}
                        icon={selected_idp.icon}

                    />
                </Col>
            </Row>);
        }

        //Generate IDP list
        let rows = null;
        if(isFetching) {
            rows = (
                <Row>
                    <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={12}>
                        <span>Loading idp data...</span>)
                    </Col>
                </Row>
            );
        } else {


            rows = idps.map(idp => (
                <Col md={4}  sm={6} xs={12} onClick={e => {e.preventDefault(); this.props.idpClick(this.props.cookies, idp.entityID)}} key={idp.entityID}>
                    <Idp name={idp.titles[0].value} country={idp.country} icon={idp.icon}/>
                </Col>
            ))

            /*
            rows = idps.map(idp => (
                <Col sm={6} smOffset={3} xs={12} onClick={e => {e.preventDefault(); this.props.idpClick(this.props.cookies, idp.entityID)}} key={idp.entityID}>
                    <Idp name={idp.titles[0].value} country={idp.country} icon={idp.icon}/>
                </Col>
            ))
            */
        }

        //Generate country filter options
        let countries = null;
        if(country_list) {
            countries = country_list.map(country => (
                <option value={country.code} key={country.code}>{country.label}</option>
            ));
        }

        //Manage errors
        let error = [];
        for(i = 0; i < error_list.length; i++) {
            var err = error_list[i];
            if (err.code === "ERROR_NO_RETURN_URL") {
                error.push(
                    <p key={err.code} className="small error">
                        Warning: It appears as if you visited this page directly, this will not work. Please
                        login <a href="https://www.clarin.eu/content/easy-access-protected-resources">via the service</a> you
                        are trying to access.
                    </p>)
            }
            console.log("Error: " + err.code + ", message=" + err.message);
        }

        //Return UI
        return (
            <div className="idpList">
                <Row>
                    <Col xs={12} lgOffset={0}>
                        <h3>Sign in via the CLARIN Service Provider Federation</h3>
                        <p className="small">
                            Select your identity provider below. This is usually the institution where you work or study. Signing in here will allow you to access certain CLARIN resources and services which are only available to users who have logged in.
                            If you cannot find your institution in the list below, please select the clarin.eu website account and use your CLARIN website credentials. If you don't have such credentials you can register an
                            account <a href="https://user.clarin.eu/register">here</a>. For questions please contact <a href="mailto:spf@clarin.eu">spf@clarin.eu</a>.
                        </p>
                        {error}
                    </Col>
                </Row>
                <Grid>{selected}</Grid>
                <Row>
                    <Col md={4} mdOffset={3} sm={8} smOffset={0}>
                        <InputGroup>
                            <InputGroup.Addon><i className="fas fa-search"></i></InputGroup.Addon>
                            <FormControl
                                type="text"
                                defaultValue=""
                                placeholder="Search for your home organization..."
                                onChange={e => {e.preventDefault(); this.props.patternChange(e.target.value)}} />
                        </InputGroup>
                    </Col>
                    <Col md={2} sm={4}>
                        <FormControl componentClass="select" placeholder="Filter by country" onChange={e => {e.preventDefault(); this.props.countryChange(e.target.value)}}>
                            <option value="*" key="all">All</option>
                            {countries}
                        </FormControl>
                    </Col>
                </Row>
                <Grid className="grid-margin">{rows}</Grid>
                <Row>
                    <Col xs={6} xsOffset={3}>
                        <Row>
                            <Col xs={4}>
                                <ButtonGroup>
                                    <Button onClick={e => {e.preventDefault(); this.props.previousPageClick()}}>
                                        <i className="fa fas fa-angle-left"></i>
                                    </Button>
                                    <Button onClick={e => {e.preventDefault(); this.props.firstPageClick()}}>
                                        <i className="fa fas fa-angle-double-left"></i>
                                    </Button>
                                </ButtonGroup>
                            </Col>
                            <Col xs={4} className="stats">
                                <span>{this.props.idps.index+1} to {this.props.idps.index+this.props.idps.show} out of {this.props.idps.total} total.</span>
                            </Col>
                            <Col xs={4}>
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
    cookies: instanceOf(Cookies).isRequired,
    idps: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired,
        show: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        items: PropTypes.array.isRequired,
        selected_entityId: PropTypes.string,
        selected_idp: PropTypes.shape({}),
        countries: PropTypes.array.isRequired,
        errors: PropTypes.array.isRequired,
    }).isRequired,
    previousPageClick: PropTypes.func.isRequired,
    nextPageClick: PropTypes.func.isRequired,
    firstPageClick: PropTypes.func.isRequired,
    lastPageClick: PropTypes.func.isRequired,
    patternChange: PropTypes.func.isRequired,
    countryChange: PropTypes.func.isRequired,
    idpClick: PropTypes.func.isRequired,
    setSelectedIdp: PropTypes.func.isRequired,
};

IdpList.defaultProps = {
    idps:[],
};

export default withCookies(IdpList);